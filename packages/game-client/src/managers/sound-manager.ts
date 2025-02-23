import { GameClient } from "@/client";
import { linearFalloff } from "@/util/math";
import { DEBUG_DISABLE_SOUNDS, DEBUG_VOLUME_REDUCTION } from "@shared/debug";
import { distance } from "@shared/util/physics";
import Vector2 from "@shared/util/vector2";

// these values must match the sound files in the client
export const SOUND_TYPES_TO_MP3 = {
  PISTOL: "pistol",
  PLAYER_HURT: "player_hurt",
  PICK_UP_ITEM: "pick_up_item",
  DROP_ITEM: "drop_item",
  PLAYER_DEATH: "player_death",
  ZOMBIE_DEATH: "zombie_death",
  ZOMBIE_HURT: "zombie_hurt",
  SHOTGUN_FIRE: "shotgun_fire",
  ZOMBIE_ATTACKED: "zombie_bite",
  GUN_EMPTY: "gun_empty",
  KNIFE_ATTACK: "knife_swing",
  LOOT: "loot",
} as const;

export type SoundType = (typeof SOUND_TYPES_TO_MP3)[keyof typeof SOUND_TYPES_TO_MP3];

export class SoundManager {
  private gameClient: GameClient;
  private audioCache: Map<SoundType, HTMLAudioElement>;
  private static readonly MAX_DISTANCE = 800;
  private isMuted: boolean = false;

  constructor(gameClient: GameClient) {
    this.gameClient = gameClient;
    this.audioCache = new Map();
    this.preloadSounds();
  }

  private preloadSounds() {
    // Create and cache an audio element for each sound type
    Object.values(SOUND_TYPES_TO_MP3).forEach((soundType) => {
      const audio = new Audio(this.getSrc(soundType));
      audio.preload = "auto"; // Ensure the browser preloads the sound
      this.audioCache.set(soundType, audio);
    });
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  public getMuteState(): boolean {
    return this.isMuted;
  }

  public playPositionalSound(sound: SoundType, position: Vector2) {
    if (this.isMuted || DEBUG_DISABLE_SOUNDS) return;

    const myPlayer = this.gameClient.getMyPlayer();
    if (!myPlayer) return;

    const dist = distance(myPlayer.getPosition(), position);
    const volume = linearFalloff(dist, SoundManager.MAX_DISTANCE) * DEBUG_VOLUME_REDUCTION;

    const audio = this.audioCache.get(sound)?.cloneNode() as HTMLAudioElement;
    if (audio) {
      audio.volume = volume;
      audio.play();
    }
  }

  public getSrc(sound: SoundType): string {
    return `./sounds/${sound}.mp3`;
  }
}
