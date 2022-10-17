import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {
        const createAppointment = new CreateAppointment()

        const startsAt = getFutureDate('2022-08-10')
        const endsAt = getFutureDate('2022-08-11')

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    })
})