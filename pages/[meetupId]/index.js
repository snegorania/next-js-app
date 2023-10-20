import { MongoClient, ObjectId } from "mongodb";
import styles from "./MeetupDetail.module.css";
import React from "react";
import Head from "next/head";

const MeetupDetailPage = ({ title, image, description, address }) => {
  return (
    <React.Fragment>
      <Head>
        <title>React Meetup</title>
        <meta name="description" content="Explore our meetup"></meta>
        <meta
          name="viewprot"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <div className={styles.info}>
        <img className={styles.image} src={image} alt="meetup picture" />
        <h2>{title}</h2>
        <address>{address}</address>
        <p>{description}</p>
      </div>
    </React.Fragment>
  );
};

export default MeetupDetailPage;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://mongouser:mongosecretepassword@localhost:27017/meetups?authSource=admin"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const result = await meetupsCollection.find({}, { _id: 1 }).toArray();
  return {
    fallback: "blocking",
    paths: result.map((id) => {
      return { params: { meetupId: id._id.toString() } };
    }),
  };
}

export async function getStaticProps(context) {
  const id = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb://mongouser:mongosecretepassword@localhost:27017/meetups?authSource=admin"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const result = await meetupsCollection.findOne({ _id: new ObjectId(id) });

  return {
    props: {
      title: result.title,
      address: result.address,
      image: result.image,
      description: result.description,
    },
  };
}
