// charge bank account
const Flutterwave = require('flutterwave-node-v3');
const open = require('open');

// const flw = new Flutterwave("FLWPUBK-*************-X", "FLWSECK-********************-X");
const flw = new Flutterwave("FLWPUBK_TEST-0d4e54a6400afbaf9b3b6c5d4c8ae101-X", "FLWSECK_TEST-3522fcd48f6a6b0b191e031756cf5736-X");
const payload = {
    "card_number": "5531886652142950",
    "cvv": "564",
    "expiry_month": "09",
    "expiry_year": "21",
    "currency": "NGN",
    "amount": "100",
    "redirect_url": "https://www.google.com",
    "fullname": "Olufemi Obafunmiso",
    "email": "olufemi@flw.com",
    "phone_number": "0902620185",
    "enckey": "FLWSECK_TEST1afcf69242d8",
    "tx_ref": "MC-32444ee--4eerye4euee3rerds4423e43e" // This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.

}


const chargeCard = async () => {
    try {
        const response = await flw.Charge.card(payload)
        console.log(response)
        if (response.meta.authorization.mode === 'pin') {
            let payload2 = payload
            payload2.authorization = {
                "mode": "pin",
                "fields": [
                    "pin"
                ],
                "pin": 3310
            }
            const reCallCharge = await flw.Charge.card(payload2)

            const callValidate = await flw.Charge.validate({
                "otp": "12345",
                "flw_ref": reCallCharge.data.flw_ref
            })
            console.log(callValidate)

        }
        if (response.meta.authorization.mode === 'redirect') {

            var url = response.meta.authorization.redirect
            open(url)
        }

        console.log(response)


    } catch (error) {
        console.log(error)
    }
}

chargeCard();


