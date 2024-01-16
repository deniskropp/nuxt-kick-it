/**
 * Custom hook to manage a status object and update it.
 * @param key - Optional key used to persist the status object.
 * @param init - Optional function used to initialize the status object.
 * @returns An object containing the status object and the update function.
 */
export default function useStatus<S extends Status>(
    key?: string,
    init?: () => MaybeRef<S>
): UseStatusReturn<S> {
    // Initialize the status object
    const status = useState<StatusType<S>>(key ?? 'status', () => ({
        label: 'Status',
        color: 'primary',

        // Initialize the 'serial' counting from zero
        serial: 0,

        // Set the 'Time' property of the status object
        // to the current date and time (creation timestamp)
        Time: new Date().toLocaleString(),

        // Use the 'init' function to initialize the
        // status object further
        ...unref(init ? init() : null)
    }))

    /**
     * Function to update the status object with new values.
     * @param updated - Object containing the new values to update the status object with.
     */
    const update = (updated: MaybeRef<Partial<S>>) => {
        const newSerial = status.value.serial + 1

        status.value = {
            ...status.value,
            ...unref(updated),
            serial: newSerial,
            // TODO: Change 'Time' property or add another?
        }
    }

    // Return the status object and the update function
    return {
        status,
        update
    }
}

/**
 * Represents a status type.
 * @template S The type of status.
 */
export type StatusType<S extends Status> = S & {
    /**
     * The serial number.
     */
    serial: number,

    /**
     * The time of the status.
     */
    Time: string
}

/**
 * Represents the return type of the `useStatus` function.
 * It contains a `status` property and an `update` function.
 */
export type UseStatusReturn<S extends Status> = {
    /**
     * Status object with the current values.
     */
    status: Ref<StatusType<S>>,

    /**
     * Updates the status object with new values.
     * @param updated - Object containing the new values to update the status object with.
     */
    update: (updated: MaybeRef<Partial<S>>) => void
}
