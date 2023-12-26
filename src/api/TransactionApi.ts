import {TransactionDto} from "../data/dto/TransactionDto.ts";
import axios from "axios";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts";

const baseUrl = "http://localhost:8080"
const getAuthConfig = async () => {
    const accessToken = await FirebaseAuthService.getAccessToken()
    if (!accessToken) {
        throw new Error();
    }
    return {headers: {Authorization: `Bearer ${accessToken}`}}
}


export async function prepareTransaction(): Promise<TransactionDto> {
    try {
        const response = await axios.post(
            `${baseUrl}/transaction/prepare`,
            null,
            await getAuthConfig()
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getTransactionByID(tid: string): Promise<TransactionDto> {
    try {
        const response = await axios.get(
            `${baseUrl}/transaction/${tid}`,
            await getAuthConfig()
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function payTransactionByID(tid: string): Promise<void> {
    try {
        await axios.patch(
            `${baseUrl}/transaction/${tid}/pay`,
            null,
            await getAuthConfig()
        )
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function finishTransactionByID(tid: string): Promise<void> {
    try {
        await axios.patch<TransactionDto>(
            `${baseUrl}/transaction/${tid}/finish`,
            null,
            await getAuthConfig()
        )
    } catch (error) {
        console.log(error)
        throw error
    }
}