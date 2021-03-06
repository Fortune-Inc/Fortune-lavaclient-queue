import type { EventEmitter } from "events";
import type { Player, Plugin } from "@fortune-inc/lavaclient";

declare module "@lavaclient/queue" {
  interface Player {
    queue: Queue;
  }
}

export class Queue extends EventEmitter {
  /**
   * The tracks that are in this queue.
   */
  readonly tracks: Song[];
  /**
   * The player for this queue.
   */
  readonly player: Player;
  /**
   * The previously played songs.
   */
  previous: Song[];
  /**
   * Whether this queue has been started or not.
   */
  started: boolean;
  /**
   * The currently playing song.
   */
  current?: Song;
  /**
   * The current length of the queue.
   */
  length: number;

  /**
   * @param player
   */
  constructor(player: Player);

  /**
   * The current type of loop that is occurring.
   */
  get loopType(): "song" | "queue" | undefined;

  /**
   * Skips the current song and returns the new playing one.
   * @since 2.0.1
   */
  skip(): Promise<Song | undefined>;

  /**
   * Start the queue.
   * @since 1.0.0
   */
  start(): Promise<boolean>;

  /**
   * Add songs to the queue.
   * @param songs The song(s) to add.
   * @param requester The user that requested this song.
   * @since 1.00.
   */
  add(songs: Addable | Array<Addable>, requester?: string | Record<string, any>): number;

  /**
   * Loop the track or queue.
   * @param type
   * @since 2.0.1
   */
  loop(type: "queue" | "song"): Queue;

  /**
   * Sort the queued songs.
   * @param predicate
   * @since 1.0.0
   */
  sort(predicate?: (a: Song, b: Song) => number): Array<Song>;

  /**
   * Shuffle all the tracks in the queue.
   * @since 1.0.0
   */
  shuffle(): void;
}

export type Addable = string | Record<string, any> | Song;

export class QueuePlugin extends Plugin {
  /**
   * The type of queue to use.
   */
  queue: typeof Queue;

  /**
   * @param queue
   */
  constructor(queue?: typeof Queue);

  /**
   * Initiates this plugin
   * @since 1.0.0
   */
  init(): typeof Player;
}

export class Song implements TrackInfo {
  /**
   * The base64 lavaplayer track.
   */
  track: string;
  /**
   * The user that requested this song.
   */
  requester?: string;
  /**
   * The length of this track.
   */
  length: number;
  /**
   * The identifier of this track.
   */
  identifier: string;
  /**
   * The author of this track.
   */
  author: string;
  /**
   * Whether this track is a stream.
   */
  isStream: boolean;
  /**
   * The position of this track
   */
  position: number;
  /**
   * The title of this track.
   */
  title: string;
  /**
   * The uri of this track.
   */
  uri: string;

  /**
   * @param track
   * @param requester
   */
  constructor(track: string, requester?: string);
}

export interface TrackInfo {
  length: number;
  identifier: string;
  author: string;
  isStream: boolean;
  position: number;
  title: string;
  uri: string;
}

