import { Positionable } from "@survive-the-night/game-server";
import { RawEntity } from "@survive-the-night/game-shared";
import { AssetManager } from "../../managers/asset";
import { GameState } from "../../state";
import { Renderable } from "../util";
import { Z_INDEX } from "@survive-the-night/game-server/src/managers/map-manager";
import { ClientEntity } from "../../entities/client-entity";

export class WallClient extends ClientEntity implements Renderable {
  constructor(data: RawEntity, assetManager: AssetManager) {
    super(data, assetManager);
  }

  public getZIndex(): number {
    return Z_INDEX.BUILDINGS;
  }

  render(ctx: CanvasRenderingContext2D, gameState: GameState): void {
    super.render(ctx, gameState);

    const positionable = this.getExt(Positionable);
    const position = positionable.getPosition();
    const image = this.assetManager.get("wall");
    ctx.drawImage(image, position.x, position.y);
  }
}
