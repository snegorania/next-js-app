import { MongoClient } from "mongodb";
import MeetupList from "@/components/MeetupList";
import React from "react";
import Head from "next/head";

export default function Home({ meetups }) {
  return (
    <React.Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Explode our meetups"></meta>
        <meta
          name="viewprot"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <MeetupList meetups={meetups} />
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://mongouser:mongosecretepassword@localhost:27017/meetups?authSource=admin"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const result = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: result.map((m) => {
        return {
          title: m.title,
          address: m.address,
          image: m.image,
          description: m.description,
          id: m._id.toString(),
        };
      }),
    },
  };
}
