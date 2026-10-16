/**
 * Activities offered by the adventure camps.
 *
 * @summary Allowed values of the activityType attribute; every camp offers exactly one of them.
 * @author Gerardo Palacin
 */
export const ACTIVITY_TYPES = ['hiking', 'trekking', 'camping', 'climbing'] as const;

/** Activity offered by an adventure camp. */
export type ActivityType = (typeof ACTIVITY_TYPES)[number];
