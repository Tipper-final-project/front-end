<h1 align="center">Welcome to Tipper! 👋</h1>

### 🏠 [Homepage](https://tipper1.netlify.app/)

## Install

In order to use this repo and run it locally, you will need to do the following:

1. Clone the repo from gitHub on your local machine

```sh
$ https://github.com/Tipper-final-project
```

2. Install Packages & Dependencies
   This project uses [node](http://nodejs.org) version v20.6.1 and [npm](https://npmjs.com) version 9.8.1
   Go check them out if you don't have them locally installed.

```sh
$ npm install
```

## ** IMPORTANT **

You will need to create the necessary environment variables in the top level of your folder

Please create the files:

1. .env
2. .env.local

---------------------------------------------------------

Inside the .env file, add these 2 variables:

```sh
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

STRIPE_SECRET_KEY=
```

see .env.example for reference

---------------------------------------------------------

Inside the .env.local file, add the following variable:

```sh
NEXT_PUBLIC_SECRET=
```

## Run Project

You can now run the project:

```sh
$ npm run dev
```

## Making a Test Payment

When filling in the payment form, use a long card number such as 4242 4242 4242 4242.

- Use a valid future date, such as 12/34.
- Use any three-digit CVC (four digits for American Express cards).
- Use any value you like for other form fields i.e. test@pay.co.uk

## Checking payment on Stripe

To check confirmation of Stripe payments:

1. Go to Payments
   <br>
   ![payments tab](../image.png)
   <p>
2. Toggle on Test Mode
   <br>
   ![test mode](../image-1.png)
   <p>
3. Select All Payments
   <br>
   ![all payments](../image-2.png)

## Authors

- Github: [Merin Yilmaz](https://github.com/Merin-Yilmaz)
- Github: [Anna van Ruiten](https://github.com/avr87)
- Github: [Amir Rashidinia](https://github.com/Amir-Rsh)
- Github: [Langa Lee](https://github.com/LangaLee)
- Github: [Eric Nabofa](https://github.com/ericnabofa)
- Github: [Gyozo Vancsura (Victor)](https://github.com/gyozoke)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Tipper-final-project/front-end/issues).

## Show your support

Give a ⭐️ if this project helped you!
