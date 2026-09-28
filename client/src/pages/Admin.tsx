import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { api, getFullImageUrl } from "@/lib/api";
import type { SupportTicket, AdminUser, AdminExerciseImage } from "@/types";

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "Nunca";

  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 5) return "En línea";
  if (diffMin < 60) return `Hace ${diffMin} min`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `Hace ${diffHours} h`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `Hace ${diffDays} d`;

  return date.toLocaleDateString();
}

function isOnline(lastActiveAt: string | null): boolean {
  if (!lastActiveAt) return false;
  return Date.now() - new Date(lastActiveAt).getTime() < 5 * 60 * 1000;
}

const TICKET_TYPE_LABELS: Record<string, string> = {
  bug: "Error",
  idea: "Idea",
  other: "Otro",
};

export function Admin() {
  const { user: currentUser } = useAuth();
  const [tab, setTab] = useState<"tickets" | "users" | "images">("tickets");

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [ticketActionStatus, setTicketActionStatus] = useState<Record<string, string>>({});
  const [busyTicketId, setBusyTicketId] = useState<string | null>(null);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [busyUserId, setBusyUserId] = useState<string | null>(null);

  const [unlockEmail, setUnlockEmail] = useState("");
  const [unlockStatus, setUnlockStatus] = useState("");

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmailVerified, setEditEmailVerified] = useState(false);
  const [editStatus, setEditStatus] = useState("");

  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [messageStatus, setMessageStatus] = useState("");

  const [images, setImages] = useState<AdminExerciseImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [busyImageId, setBusyImageId] = useState<string | null>(null);

  async function loadTickets() {
    setLoadingTickets(true);
    try {
      const data = await api.adminListTickets();
      setTickets(data);
    } finally {
      setLoadingTickets(false);
    }
  }

  async function loadUsers() {
    setLoadingUsers(true);
    try {
      const data = await api.adminListUsers();
      setUsers(data);
    } finally {
      setLoadingUsers(false);
    }
  }

  async function loadImages() {
    setLoadingImages(true);
    try {
      const data = await api.adminListExerciseImages();
      setImages(data);
    } finally {
      setLoadingImages(false);
    }
  }

  useEffect(() => {
    loadTickets();
    loadUsers();
    loadImages();
  }, []);

  async function handleResolve(id: string) {
    setBusyTicketId(id);
    try {
      await api.adminResolveTicket(id);
      await loadTickets();
    } finally {
      setBusyTicketId(null);
    }
  }

  async function handleUnlockFromTicket(email: string, ticketId: string) {
    setBusyTicketId(ticketId);
    setTicketActionStatus((s) => ({ ...s, [ticketId]: "" }));
    try {
      const result = await api.adminUnlockAccount(email);
      setTicketActionStatus((s) => ({ ...s, [ticketId]: result.message }));
      await loadUsers();
    } catch (err: any) {
      setTicketActionStatus((s) => ({ ...s, [ticketId]: err.message }));
    } finally {
      setBusyTicketId(null);
    }
  }

  async function handleUnlockFromUserRow(email: string, userId: string) {
    setBusyUserId(userId);
    try {
      await api.adminUnlockAccount(email);
      await loadUsers();
    } finally {
      setBusyUserId(null);
    }
  }

  async function handleUnlockManual(e: React.FormEvent) {
    e.preventDefault();
    setUnlockStatus("");
    try {
      const result = await api.adminUnlockAccount(unlockEmail);
      setUnlockStatus(result.message);
      setUnlockEmail("");
      await loadUsers();
    } catch (err: any) {
      setUnlockStatus(err.message);
    }
  }

  function openManageUser(u: AdminUser) {
    setEditingUserId(u.id);
    setEditName(u.name);
    setEditEmailVerified(u.emailVerified);
    setEditStatus("");
    setMessageSubject("");
    setMessageBody("");
    setMessageStatus("");
  }

  function closeManageUser() {
    setEditingUserId(null);
  }

  async function handleSaveEdit() {
    if (!editingUserId) return;
    setEditStatus("Guardando...");
    try {
      await api.adminUpdateUser(editingUserId, {
        name: editName,
        emailVerified: editEmailVerified,
      });
      setEditStatus("Cambios guardados.");
      await loadUsers();
    } catch (err: any) {
      setEditStatus(err.message);
    }
  }

  async function handleSendMessage() {
    if (!editingUserId) return;
    if (!messageSubject.trim() || !messageBody.trim()) {
      setMessageStatus("Escribe asunto y mensaje.");
      return;
    }
    setMessageStatus("Enviando...");
    try {
      await api.adminSendUserEmail(editingUserId, messageSubject, messageBody);
      setMessageStatus("Correo enviado.");
      setMessageSubject("");
      setMessageBody("");
    } catch (err: any) {
      setMessageStatus(err.message);
    }
  }

  async function handleDelete(u: AdminUser) {
    const confirmed = window.confirm(
      `¿Eliminar la cuenta de ${u.name} (${u.email})? Esto borra también sus rutinas e historial. Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    try {
      await api.adminDeleteUser(u.id);
      closeManageUser();
      await loadUsers();
    } catch {
      // el toast ya muestra el error del backend
    }
  }

  async function handleDeleteImage(img: AdminExerciseImage) {
    const confirmed = window.confirm(`¿Eliminar la imagen del ejercicio "${img.exerciseName}"?`);
    if (!confirmed) return;

    setBusyImageId(img.exerciseId);
    try {
      await api.adminDeleteExerciseImage(img.exerciseId);
      await loadImages();
    } finally {
      setBusyImageId(null);
    }
  }

  const openTicketsCount = tickets.filter((t) => t.status === "open").length;
  const lockedUsersCount = users.filter((u) => u.lockedUntil && new Date(u.lockedUntil) > new Date()).length;
  const editingUser = users.find((u) => u.id === editingUserId) ?? null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <h1 className="font-display font-bold text-2xl tracking-wide">ADMIN</h1>

        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setTab("tickets")}
            className={`text-sm px-4 py-2 border-b-2 transition-colors ${
              tab === "tickets" ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground"
            }`}
          >
            Tickets {openTicketsCount > 0 && `(${openTicketsCount})`}
          </button>
          <button
            onClick={() => setTab("users")}
            className={`text-sm px-4 py-2 border-b-2 transition-colors ${
              tab === "users" ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground"
            }`}
          >
            Usuarios ({users.length}){lockedUsersCount > 0 && ` · ${lockedUsersCount} bloqueados`}
          </button>
          <button
            onClick={() => setTab("images")}
            className={`text-sm px-4 py-2 border-b-2 transition-colors ${
              tab === "images" ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground"
            }`}
          >
            Imágenes ({images.length})
          </button>
        </div>

        {tab === "tickets" && (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 space-y-3">
              <p className="text-sm font-medium">Desbloquear cuenta manualmente</p>
              <form onSubmit={handleUnlockManual} className="flex gap-2">
                <input
                  className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  placeholder="correo@ejemplo.com"
                  type="email"
                  value={unlockEmail}
                  onChange={(e) => setUnlockEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground font-semibold px-4 rounded-md text-sm hover:opacity-90"
                >
                  Desbloquear
                </button>
              </form>
              {unlockStatus && <p className="text-xs text-muted-foreground">{unlockStatus}</p>}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm font-medium mb-4">Tickets de soporte</p>

              {loadingTickets && <p className="text-sm text-muted-foreground">Cargando...</p>}
              {!loadingTickets && tickets.length === 0 && (
                <p className="text-sm text-muted-foreground">No hay tickets.</p>
              )}

              <div className="space-y-3">
                {tickets.map((t) => (
                  <div key={t.id} className="border border-border rounded-md p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{t.subject}</p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground">
                            {TICKET_TYPE_LABELS[t.type] ?? t.type}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{t.email}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                          t.status === "open" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {t.status === "open" ? "Abierto" : "Resuelto"}
                      </span>
                    </div>

                    <p className="text-sm text-foreground">{t.message}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {new Date(t.createdAt).toLocaleString()}
                    </p>

                    <div className="flex gap-2 pt-1 items-center flex-wrap">
                      <button
                        onClick={() => handleUnlockFromTicket(t.email, t.id)}
                        disabled={busyTicketId === t.id}
                        className="text-xs px-3 py-1.5 rounded-md bg-secondary hover:bg-muted disabled:opacity-50"
                      >
                        Desbloquear cuenta
                      </button>
                      {t.status === "open" && (
                        <button
                          onClick={() => handleResolve(t.id)}
                          disabled={busyTicketId === t.id}
                          className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
                        >
                          Marcar resuelto
                        </button>
                      )}
                      {ticketActionStatus[t.id] && (
                        <span className="text-[11px] text-muted-foreground">{ticketActionStatus[t.id]}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="space-y-4">
            {editingUser && (
              <div className="bg-card border border-primary rounded-lg p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Gestionar: {editingUser.name} <span className="text-muted-foreground">({editingUser.email})</span>
                  </p>
                  <button onClick={closeManageUser} className="text-xs text-muted-foreground underline">
                    Cerrar
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Nombre</label>
                    <input
                      className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm mt-1 text-foreground focus:outline-none focus:border-primary"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editEmailVerified}
                      onChange={(e) => setEditEmailVerified(e.target.checked)}
                    />
                    Correo verificado
                  </label>

                  <div className="text-sm text-muted-foreground">
                    Rol: {editingUser.isAdmin ? <span className="text-primary font-medium">Admin</span> : "Usuario normal"}
                    <p className="text-xs mt-0.5">
                      El rol de admin solo se otorga manualmente en la base de datos, por seguridad.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md text-sm hover:opacity-90"
                    >
                      Guardar cambios
                    </button>
                    {editStatus && <span className="text-xs text-muted-foreground">{editStatus}</span>}
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Enviar correo a este usuario</p>
                  <input
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                    placeholder="Asunto"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                  />
                  <textarea
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary min-h-[80px]"
                    placeholder="Ej: Hola, vimos que no has entrado a la app en un tiempo. ¿Todo bien? Avísanos si quieres que te ayudemos con algo."
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSendMessage}
                      className="bg-secondary text-foreground font-medium px-4 py-2 rounded-md text-sm hover:bg-muted"
                    >
                      Enviar correo
                    </button>
                    {messageStatus && <span className="text-xs text-muted-foreground">{messageStatus}</span>}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <button
                    onClick={() => handleDelete(editingUser)}
                    disabled={editingUser.id === currentUser?.id}
                    className="text-xs px-4 py-2 rounded-md bg-destructive/20 text-destructive hover:bg-destructive/30 disabled:opacity-40"
                  >
                    Eliminar cuenta de este usuario
                  </button>
                  {editingUser.id === currentUser?.id && (
                    <p className="text-xs text-muted-foreground mt-1">
                      No puedes eliminar tu propia cuenta desde aquí.
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="bg-card border border-border rounded-lg p-6 overflow-x-auto">
              {loadingUsers && <p className="text-sm text-muted-foreground">Cargando...</p>}
              {!loadingUsers && users.length === 0 && (
                <p className="text-sm text-muted-foreground">No hay usuarios.</p>
              )}

              {!loadingUsers && users.length > 0 && (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b border-border">
                      <th className="pb-2 pr-3">Usuario</th>
                      <th className="pb-2 pr-3">Estado</th>
                      <th className="pb-2 pr-3">Última actividad</th>
                      <th className="pb-2 pr-3">Último login</th>
                      <th className="pb-2 pr-3">Registrado</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => {
                      const locked = u.lockedUntil && new Date(u.lockedUntil) > new Date();
                      const online = isOnline(u.lastActiveAt);

                      return (
                        <tr key={u.id} className="border-b border-border last:border-0">
                          <td className="py-3 pr-3">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${online ? "bg-success" : "bg-muted"}`}
                                title={online ? "En línea" : "Desconectado"}
                              />
                              <div>
                                <p className="font-medium">
                                  {u.name} {u.isAdmin && <span className="text-[10px] text-primary">(admin)</span>}
                                </p>
                                <p className="text-xs text-muted-foreground">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 pr-3">
                            <div className="flex flex-col gap-1">
                              {!u.emailVerified && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground w-fit">
                                  Sin verificar
                                </span>
                              )}
                              {locked && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/20 text-destructive w-fit">
                                  Bloqueada
                                </span>
                              )}
                              {u.emailVerified && !locked && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success w-fit">
                                  Activa
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 pr-3 text-xs text-muted-foreground">
                            {formatRelativeTime(u.lastActiveAt)}
                          </td>
                          <td className="py-3 pr-3 text-xs text-muted-foreground">
                            {formatRelativeTime(u.lastLoginAt)}
                          </td>
                          <td className="py-3 pr-3 text-xs text-muted-foreground">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3">
                            <div className="flex gap-1.5 flex-wrap">
                              {locked && (
                                <button
                                  onClick={() => handleUnlockFromUserRow(u.email, u.id)}
                                  disabled={busyUserId === u.id}
                                  className="text-xs px-3 py-1.5 rounded-md bg-secondary hover:bg-muted disabled:opacity-50 whitespace-nowrap"
                                >
                                  Desbloquear
                                </button>
                              )}
                              <button
                                onClick={() => openManageUser(u)}
                                className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 whitespace-nowrap"
                              >
                                Gestionar
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {tab === "images" && (
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm font-medium mb-1">Imágenes subidas por usuarios</p>
            <p className="text-xs text-muted-foreground mb-4">
              Solo se muestran imágenes subidas manualmente — no las de plantilla (wger).
            </p>

            {loadingImages && <p className="text-sm text-muted-foreground">Cargando...</p>}
            {!loadingImages && images.length === 0 && (
              <p className="text-sm text-muted-foreground">No hay imágenes subidas por usuarios.</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img.exerciseId} className="border border-border rounded-md overflow-hidden">
                  <div className="aspect-square bg-secondary">
                    {img.imageUrl && (
                      <img
                        src={getFullImageUrl(img.imageUrl)!}
                        alt={img.exerciseName}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-2 space-y-1">
                    <p className="text-xs font-medium truncate">{img.exerciseName}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{img.owner.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{img.owner.email}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(img.createdAt).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleDeleteImage(img)}
                      disabled={busyImageId === img.exerciseId}
                      className="w-full text-[11px] px-2 py-1 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 disabled:opacity-50 mt-1"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}