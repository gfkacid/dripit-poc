"use client";
import React from "react";
import { Accordion } from "flowbite-react";
import PageHeading from "../generic/PageHeading";

const questions = [
  {
    title: "Do I need a crypto wallet to use dripit?",
    content: (
      <p>
        No! We have implemented Safe’s Account Abstraction stack, which enables
        anyone to sign up with their Google/Twitter/Discord account! A crypto
        wallet is created for you under the hood, maintaining ownership of your
        assets, and all gas fees are sponsored by us!,
      </p>
    ),
  },
  {
    title: "Can I control my assets outside the scope of dripit app?",
    content: (
      <p>
        You can always export the private key of your generated EOA account,
        which is the owner of your Safe account that contains all your assets.
        Any transaction you’d like to execute can be handled through Safe’s{" "}
        <a href="https://app.safe.global/" target="_blank">
          dashboard interface
        </a>
        .
      </p>
    ),
  },
  {
    title: "How can I buy a Drop?",
    content: (
      <>
        <p>
          Drop sales are open for a specific period of time. Head over to the
          page of the Drop you’d like to buy, and as long as the sale is open,
          Drop isn’t minted out, and you have sufficient EURe balance in your
          Safe(*) you can click on the [Buy Token] button and mint some pieces!{" "}
        </p>
        <p>
          (*) Note that due to incompatibility of EURe token with Safe wallets,
          we currently have set the minting price of each token to 0. This will
          be amended as soon as Monerium deploys their upgraded token contracts
          - due by end of October.
        </p>
      </>
    ),
  },
];

const Faq = () => {
  return (
    <div className="mt-24 mb-24">
      <PageHeading>FAQ</PageHeading>

      <Accordion>
        {questions.map(({ title, content }, index) => (
          <Accordion.Panel key={index}>
            <Accordion.Title>{title}</Accordion.Title>
            <Accordion.Content>
              <div className="mb-2 text-gray-500 dark:text-gray-400">
                {content}
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
