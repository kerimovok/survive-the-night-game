import { Vector2 } from "../../../game-shared/src/util/physics";
import { Extension, ExtensionSerialized } from "@/extensions/types";
import { IEntity } from "@/entities/types";
import { ExtensionTypes } from "../../../game-shared/src/util/extension-types";

export default class Positionable implements Extension {
  public static readonly type = ExtensionTypes.POSITIONABLE;

  private self: IEntity;
  private x = 0;
  private y = 0;
  private size = 0;

  public constructor(self: IEntity) {
    this.self = self;
  }

  public getSize(): number {
    return this.size;
  }

  public setSize(size: number): this {
    this.size = size;
    return this;
  }

  public getCenterPosition(): Vector2 {
    return {
      x: this.x + this.size / 2,
      y: this.y + this.size / 2,
    };
  }

  public getPosition(): Vector2 {
    return { x: this.x, y: this.y };
  }

  public setPosition(position: Vector2): void {
    this.x = position.x;
    this.y = position.y;
  }

  public serialize(): ExtensionSerialized {
    return {
      type: Positionable.type,
      x: this.x,
      y: this.y,
      size: this.size,
    };
  }
}
