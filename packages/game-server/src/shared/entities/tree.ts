import { EntityManager } from "../../managers/entity-manager.js";
import { Entities, Entity, RawEntity } from "../entities.js";
import { Vector2 } from "../physics.js";
import { Interactable, Positionable } from "../traits.js";
import { Player } from "./player.js";

export class Tree extends Entity implements Interactable, Positionable {
  private position: Vector2 = { x: 0, y: 0 };

  constructor(entityManager: EntityManager) {
    super(entityManager, Entities.TREE);
  }

  interact(player: Player): void {
    if (player.isInventoryFull()) {
      return;
    }

    player.getInventory().push({
      key: "Wood",
    });

    this.getEntityManager().markEntityForRemoval(this);
  }

  serialize(): RawEntity {
    return {
      ...super.serialize(),
      position: this.position,
    };
  }

  getPosition(): Vector2 {
    return this.position;
  }

  setPosition(position: Vector2) {
    this.position = position;
  }

  getCenterPosition(): Vector2 {
    return this.position;
  }
}
