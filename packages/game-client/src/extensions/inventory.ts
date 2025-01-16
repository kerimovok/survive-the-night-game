import { ExtensionTypes } from "../../../game-shared/src/util/extension-types";
import { InventoryItem } from "../../../game-shared/src/util/inventory";
import { ClientExtension, ClientExtensionSerialized } from "@/extensions/types";

export class ClientInventory implements ClientExtension {
  public static readonly type = ExtensionTypes.INVENTORY;
  public static readonly MAX_SLOTS = 8;

  private items: InventoryItem[] = [];

  public getItems(): InventoryItem[] {
    return this.items;
  }

  public isFull(): boolean {
    return this.items.length >= ClientInventory.MAX_SLOTS;
  }

  public getActiveItem(index: number | null): InventoryItem | null {
    if (index === null) return null;
    return this.items[index - 1] ?? null;
  }

  public getActiveWeapon(activeItem: InventoryItem | null): InventoryItem | null {
    const activeKey = activeItem?.key ?? "";
    return ["knife", "shotgun", "pistol"].includes(activeKey) ? activeItem : null;
  }

  public deserialize(data: ClientExtensionSerialized): this {
    if (data.items) {
      this.items = data.items;
    }
    return this;
  }
}
