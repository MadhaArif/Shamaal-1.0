const STORAGE_KEY = "shamaal_owned_memories";

type OwnedMemory = { id: string; deleteToken: string };

export function getOwnedMemories(): OwnedMemory[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OwnedMemory[]) : [];
  } catch {
    return [];
  }
}

export function addOwnedMemory(id: string, deleteToken: string) {
  const list = getOwnedMemories().filter((m) => m.id !== id);
  list.unshift({ id, deleteToken });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function removeOwnedMemory(id: string) {
  const list = getOwnedMemories().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getDeleteToken(id: string): string | null {
  return getOwnedMemories().find((m) => m.id === id)?.deleteToken ?? null;
}

export function isOwnedMemory(id: string): boolean {
  return getOwnedMemories().some((m) => m.id === id);
}
