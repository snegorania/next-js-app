import { useRouter } from "next/router";
import NewMeetupForm from "@/components/NewMeetupForm";
import Head from "next/head";
import React from "react";

const NewMeetupPage = () => {
  const router = useRouter();
  const handleAddMeetup = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetupData),
    });
    return router.push("/");
  };

  return (
    <React.Fragment>
        <Head>
            <title>Add new Meetup</title>
            <meta name="description" content="Add new awersome meetup"></meta>
            <meta name="viewprot" content="width=device-width, initial-scale=1"></meta>
        </Head>
      <NewMeetupForm onAddMeetup={handleAddMeetup} />
    </React.Fragment>
  );
};

export default NewMeetupPage;
