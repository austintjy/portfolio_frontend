import { createHash } from 'crypto'
import { NextApiRequest } from 'next'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export const verifyCsrfToken = (req: NextApiRequest): boolean => {
    try {
        const rawCookieString = req.headers.cookie || '' // raw cookie string, possibly multiple cookies
        const rawCookiesArr = rawCookieString.split(';')

        let parsedCsrfTokenAndHash: string | undefined;

        for (let i = 0; i < rawCookiesArr.length; i++) { // loop through cookies to find CSRF from next-auth
            let cookieArr = rawCookiesArr[i].split('=')
            if (cookieArr[0].trim().search('next-auth.csrf-token') !== -1) {
                parsedCsrfTokenAndHash = cookieArr[1]
                break
            }
        }

        if (!parsedCsrfTokenAndHash) {
            return false
        }
        // delimiter could be either a '|' or a '%7C'
        const tokenHashDelimiter =
            parsedCsrfTokenAndHash.indexOf('|') !== -1 ? '|' : '%7C'

        const [requestToken, requestHash] = parsedCsrfTokenAndHash.split(
            tokenHashDelimiter
        )

        const secret = process.env.NEXTAUTH_SECRET

        // compute the valid hash
        const validHash = createHash('sha256')
            .update(`${requestToken}${secret}`)
            .digest('hex')
        if (requestHash !== validHash) {
            return false
        }


    } catch (err) {
        return false
    }
    return true
}

export const verifyCsrfTokenNextReq = (req: NextRequest): boolean => {
    try {
        const cookie = req.cookies.get('next-auth.csrf-token')?.value;
        if (!cookie) {
            return false
        }
        // delimiter could be either a '|' or a '%7C'
        const tokenHashDelimiter =
            cookie.indexOf('|') !== -1 ? '|' : '%7C'

        const [requestToken, requestHash] = cookie.split(
            tokenHashDelimiter
        )

        const secret = process.env.NEXTAUTH_SECRET

        // compute the valid hash
        const validHash = createHash('sha256')
            .update(`${requestToken}${secret}`)
            .digest('hex')
        if (requestHash !== validHash) {
            return false
        }


    } catch (err) {
        return false
    }
    return true
}