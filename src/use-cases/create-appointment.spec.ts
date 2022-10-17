import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../utils/get-future-date";
import { CreateAppointment } from "./create-appointment";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-appointments-repository"

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {
        const startsAt = getFutureDate('2022-08-10')
        const endsAt = getFutureDate('2022-08-11')
        
        const AppointmentsRepository = new InMemoryAppointmentRepository()
        const createAppointment = new CreateAppointment(
            AppointmentsRepository
        )
        
        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    })

    it('should not be able to create an appointment with overlapping dates', async () => {
        const startsAt = getFutureDate('2022-08-10')
        const endsAt = getFutureDate('2022-08-15')
        
        const AppointmentsRepository = new InMemoryAppointmentRepository()
        const createAppointment = new CreateAppointment(
            AppointmentsRepository
        )
        await createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2022-08-14'),
            endsAt: getFutureDate('2022-08-18')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2022-08-08'),
            endsAt: getFutureDate('2022-08-12')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2022-08-08'),
            endsAt: getFutureDate('2022-08-17')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2022-08-11'),
            endsAt: getFutureDate('2022-08-12')
        })).rejects.toBeInstanceOf(Error)
    })
})