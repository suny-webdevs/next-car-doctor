import axios from "axios"

export const getServices = async () => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_APP_URL}/services/api/services`
    )
    return data
  } catch (error) {
    return []
  }
}

export const getService = async (id) => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_APP_URL}/services/api/${id}`
    )
    return data.service
  } catch (error) {
    return {}
  }
}

export const getBookingsByEmail = async (email) => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_APP_URL}/my-bookings/api/${email}`
    )
    return data
  } catch (error) {
    return []
  }
}

export const getBookingsById = async (id) => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_APP_URL}/my-bookings/api/booking/${id}`
    )
    return data
  } catch (error) {
    return {}
  }
}
