import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";
import Head from "next/head";
interface MeetupData {
  id: string;
  title: string;
  image: string;
  address: string;
  description: string;
}

const HomePage = (props: { meetups: Array<MeetupData> }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://quingsley:3ceHwlZoNfB6sbUG@cluster0.hkxyhxj.mongodb.net/meetups?retryWrites=true"
  );

  const db = client.db();
  if (db) {
    console.log("Connected successfully");
  }
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  const data = meetups.map((meetup) => {
    return {
      id: meetup._id.toString(),
      title: meetup.title,
      image: meetup.image,
      address: meetup.address,
      description: meetup.description,
    } as MeetupData;
  });
  return {
    props: {
      meetups: data,
    },
  };
}
export default HomePage;
