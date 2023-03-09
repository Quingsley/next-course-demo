import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetUpDetail from "@/components/meetups/MeetupDetail";
const MeetUpDetailPage = (props: {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
}) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetUpDetail
        image={props.image}
        title={props.title}
        description={props.description}
      />
    </>
  );
};

export default MeetUpDetailPage;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://quingsley:3ceHwlZoNfB6sbUG@cluster0.hkxyhxj.mongodb.net/meetups?retryWrites=true"
  );

  const db = client.db();
  if (db) {
    console.log("Connected successfully");
  }
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection
    .find(
      {},
      {
        projection: {
          _id: 1,
        },
      }
    )
    .toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => {
      return {
        params: {
          meetupId: meetup._id.toString(),
        },
      };
    }),
  };
}

export async function getStaticProps(context: {
  params: { meetupId: string };
}) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://quingsley:3ceHwlZoNfB6sbUG@cluster0.hkxyhxj.mongodb.net/meetups?retryWrites=true"
  );

  const db = client.db();
  if (db) {
    console.log("Connected successfully");
  }
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  if (selectedMeetup) {
    return {
      props: {
        image: selectedMeetup!.image,
        title: selectedMeetup!.title,
        description: selectedMeetup!.description,
        id: selectedMeetup!._id.toString(),
        address: selectedMeetup!.address,
      },
    };
  }
}
