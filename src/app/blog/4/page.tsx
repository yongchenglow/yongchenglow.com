"use client";

import Image from "next/image";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/cjs/styles/hljs/docco";
import ArticleContainer from "@/src/components/article/ArticleContainer";
import BlogHeader from "@/src/components/article/ArticleHeader";
import ArticleHeading from "@/src/components/article/ArticleHeading";
import ArticleText from "@/src/components/article/ArticleText";
import ContentContainer from "@/src/components/article/ContentContainer";
import ImageContainer from "@/src/components/article/ImageContainer";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import Link from "@/src/components/shared/atoms/Link";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/src/components/shared/ui/table";

type OnDelete = {
	action: string;
	description: string;
};

const deleteActions: OnDelete[] = [
	{
		action: "NO ACTION (Default)",
		description: "Referenced row will not be deleted",
	},
	{
		action: "RESTRICT",
		description: "Prevents Deletion of Primary Key",
	},
	{
		action: "CASCADE",
		description: "Referenced rows will be deleted as well",
	},
];

export default function BlogPost4Page() {
	return (
		<StandardLayout>
			<ArticleContainer>
				<BlogHeader
					title="Single Source of Truth"
					subtitle="Creating a reliable Database"
				/>
				<ImageContainer>
					<Image
						style={{ width: "100%", height: "auto" }}
						src="/img/database-schema-gf6a494e82_1280.png"
						alt="database"
						width={1280}
						height={853}
						priority={false}
					/>
				</ImageContainer>
				<ContentContainer>
					<ArticleText className="mb-3">
						One of the most important software engineering principles is to
						ensure that we have a single source of truth. For the context of
						creating web applications, the single source of truth <b>is</b> the
						database. Therefore, designing a database to reliably store and
						manipulate data is one of our utmost priorities.
					</ArticleText>
					<ArticleText className="mb-7">
						To keep things simple for this beginner series, we will focus on a
						SQL Database. Examples will be given using an open-source Database
						Engine known as PostgreSQL. For other SQL Engines, e.g., Oracle,
						their syntax may slightly differ, however, the similar principles
						will apply. We will also be narrowing our scope to learn about
						database constraints and normalization. Other topics such as
						security and performance will be left for another day.
					</ArticleText>
					<ArticleHeading level={2} className="mb-2">
						Database Constraints
					</ArticleHeading>
					<ImageContainer>
						<Image
							style={{ width: "100%", height: "auto" }}
							src="/img/server-gebd52a943_1280.jpg"
							alt="constraints"
							width={1280}
							height={853}
							priority={false}
						/>
					</ImageContainer>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							<Link
								href="https://www.postgresql.org/docs/current/datatype.html"
								target="_blank"
							>
								<b>Database constraints </b>
							</Link>{" "}
							give you control over the data stored inside the tables
						</div>
					</div>
					<ArticleText className="mb-3">
						In order to ensure that our database is the single source of truth,
						we need to ensure that our validations occur at the database level.
						This can be done by adding constraints to what we can store in our
						database through the different kinds of data types.
					</ArticleText>
					<ArticleText className="mb-3">
						Let&apos;s say we want to store a user&apos;s username into our
						database. We will be using a character varying data type. We can
						further strengthen the database validation by limiting the username
						to be a maximum of 50 characters long:
					</ArticleText>
					<div className="text-base text-center mb-7">
						<SyntaxHighlighter language="sql" style={docco}>
							CREATE TABLE user(id serial primary key, username varchar(50));
						</SyntaxHighlighter>
					</div>
					<ArticleHeading level={3} className="mb-2">
						Checks
					</ArticleHeading>
					<ArticleText className="mb-3">
						In addition to using the different data types that Postgres
						provides, we can also add additional constraints. Let&apos;s say we
						want to store the price of an item in the database. Logically
						speaking we would want to store the price as a non-negative number
						with 2 decimal places. We can achieve this in the following manner
					</ArticleText>
					<div className="text-base text-center mb-3">
						<SyntaxHighlighter
							language="sql"
							style={docco}
							customStyle={{
								textAlign: "left",
								display: "inline-block",
								padding: "0 1.25rem",
							}}
						>
							{`
CREATE TABLE products (
  id integer primary key,
  name varchar(50),
  price numeric(5,2) CHECK (price >= 0)
);
                `}
						</SyntaxHighlighter>
					</div>
					<ArticleText className="mb-10">
						The{" "}
						<SyntaxHighlighter
							language="sql"
							style={docco}
							customStyle={{
								display: "inline-block",
								margin: 0,
								padding: 0,
								overflowX: "visible",
								fontSize: "20px",
							}}
						>
							numeric(5,2)
						</SyntaxHighlighter>{" "}
						allows us to have a maximum and minimum of 5 digits of which 2 are
						decimal points(-999.99 to 999.99)
					</ArticleText>
					<ArticleHeading level={3} className="mb-2">
						Primary Keys
					</ArticleHeading>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							<b>Primary Keys</b> are a unique identifier for a row of data
						</div>
					</div>
					<ArticleText className="mb-7">
						Primary keys are usually indexed automatically by the database to
						allow for fast access. For example, according to PostgreSQL
						documentation a B-Tree index is automatically created for primary
						keys.
					</ArticleText>
					<ArticleHeading level={3} className="mb-2">
						Foreign keys
					</ArticleHeading>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							<b>Foreign keys</b> are references to a row with a primary key in
							another table
						</div>
					</div>
					<ArticleText className="mb-3">
						For Foreign keys, there are additional behaviors that you can set
						when the primary key is deleted.
					</ArticleText>
					<div className="text-base text-center mb-3">
						<SyntaxHighlighter
							language="sql"
							style={docco}
							customStyle={{
								textAlign: "left",
								display: "inline-block",
								padding: "0 1.25rem",
							}}
						>
							{`
CREATE TABLE order_items (
    product_id integer REFERENCES products ON DELETE RESTRICT,
    order_id integer REFERENCES orders ON DELETE CASCADE,
    quantity integer,
    PRIMARY KEY (product_id, order_id)
);
                `}
						</SyntaxHighlighter>
					</div>
					<Table className="min-w-[650px]">
						<TableHeader>
							<TableRow>
								<TableHead className="text-center">Action</TableHead>
								<TableHead className="text-center">Description</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{deleteActions.map((deleteEvent) => (
								<TableRow key={deleteEvent.action}>
									<TableCell className="text-center font-medium">
										{deleteEvent.action}
									</TableCell>
									<TableCell className="text-center">
										{deleteEvent.description}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<ArticleHeading level={3} className="mt-10 mb-2">
						Not Null
					</ArticleHeading>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							<b>Not Null</b> constraint does not allow null values
						</div>
					</div>
					<ArticleText className="mb-3">
						It is important to note that null does not mean empty string. If you
						want to validate for a non-empty string, you need to add an
						additional length check.
					</ArticleText>
					<div className="text-base text-center mb-7">
						<SyntaxHighlighter
							language="sql"
							style={docco}
							customStyle={{
								textAlign: "left",
								display: "inline-block",
								padding: "0 1.25rem",
							}}
						>
							{`
CREATE TABLE user (
  id serial primary key,
  username VARCHAR NOT NULL CONSTRAINT non_empty CHECK(length(username) > 0)
)
                `}
						</SyntaxHighlighter>
					</div>
					<ArticleHeading level={3} className="mb-2">
						Unique
					</ArticleHeading>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							<b>Unique</b> constraint means that every value in the column must
							be unique
						</div>
					</div>
					<ArticleText className="mb-3">
						It is important to note that a unique contain can also be placed on
						multiple columns at the same time. For example, if we want to go
						back to our trustworthy AirBnB application, lets say we want to
						create a favorites table to store flats that the user saved. In
						order to prevent double insertions (saving to favorites twice), we
						add a unique constraint on user_id and flat_id
					</ArticleText>
					<div className="text-base text-center mb-3">
						<SyntaxHighlighter
							language="ruby"
							style={docco}
							customStyle={{
								textAlign: "left",
								display: "inline-block",
								padding: "0 1.25rem",
							}}
						>
							{`
class CreateFavorites < ActiveRecord::Migration[6.1]
  def change
    create_table :favorites do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.references :flat, null: false, foreign_key: true, index: true
      t.timestamps
    end
    add_index :favorites, [:user_id, :flat_id], unique: true
  end
end
                `}
						</SyntaxHighlighter>
					</div>
					<GoogleAds slotId="5768607169" />
					<ArticleHeading level={2} className="mt-7 mb-2">
						Database Normalization
					</ArticleHeading>
					<ImageContainer>
						<Image
							style={{ width: "100%", height: "auto" }}
							src="/img/database-g2fad27680_1280.jpg"
							alt="database normalization"
							width={1280}
							height={853}
							priority={false}
						/>
					</ImageContainer>
					<div className="text-base text-center mb-3 italic">
						<Link
							href="https://opentextbc.ca/dbdesign01/chapter/chapter-12-normalization/"
							target="_blank"
						>
							<b>Normalization</b>
						</Link>{" "}
						is a database design technique that reduces data redundancy, and
						anomalies.
					</div>
					<ArticleText className="mb-3">
						Now that we have talk about the different database constrains for
						each column, we will now turn our attention to the table itself. To
						keep things simple, we will only focus from 1<sup>st</sup> Normal
						Form to 3.5 Normal Form, otherwise known as Boyce-Codd normal
						form(BCNF) which is usually the requirements needed to pass most
						technical assessments. There are greater levels of{" "}
						<Link
							href="https://www.guru99.com/database-normalization.html"
							target="_blank"
						>
							normalization
						</Link>{" "}
						but we won&apos;t be covering them here.
					</ArticleText>
					<ArticleText className="mb-7">
						To keep things simple for the examples, we will assume that columns
						without the word ID contains more information related to that
						domain. E.g. Student will be used to represent StudentName,
						StudentAge etc.
					</ArticleText>
					<ArticleHeading level={3} className="mb-2">
						1<sup>st</sup> Normal Form
					</ArticleHeading>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							Each Table Cell should contain a single value
						</div>
						<div className="text-base text-center mb-2 italic">
							Values stored in a column should be of the same data type
						</div>
						<div className="text-base text-center mb-2 italic">
							Columns and Tables should have unique names
						</div>
						<div className="text-base text-center mb-2 italic">
							Order in which the data is stored should not matter
						</div>
					</div>
					<ArticleText className="mt-5 mb-3">
						Let&apos;s say we have to store the following information in the
						database about a students&apos; grade report.
					</ArticleText>
					<div className="text-base text-center mb-3">
						<SyntaxHighlighter
							language="sql"
							style={docco}
							customStyle={{
								textAlign: "left",
								display: "inline-block",
								padding: "0 1.25rem",
							}}
						>
							{`
Student_Grade_Report (StudentId, Student, Major, Advisor, [Course, Grade])
                `}
						</SyntaxHighlighter>
					</div>
					<ArticleText className="mb-3">
						It is easy to identify from the current table design that one
						student will take multiple courses and obtain one grade for each
						course. However, in order to satisfy the rule of each table cell
						should contain a single value and not an array of value, we should
						split the tables into the following manner.
					</ArticleText>
					<div className="text-base text-center mb-3">
						<SyntaxHighlighter
							language="sql"
							style={docco}
							customStyle={{
								textAlign: "left",
								display: "inline-block",
								padding: "0 1.25rem",
							}}
						>
							{`
Student (StudentId, Student, Major, Advisor)
StudentCourse (StudentId, Course, Grade)
                `}
						</SyntaxHighlighter>
					</div>
					<ArticleText className="mb-3">
						So why do we want to divide the data this way, and why is it better?
						Well first of all, notice that by dividing the table into 2, updates
						can safely occur to both tables at the same time. If we were to go
						with our original design, if 2 read and writes were to occur at
						almost the same time, the data of one may override another:
					</ArticleText>
					<div className="text-base text-center mb-3">
						<SyntaxHighlighter
							language="bash"
							style={docco}
							customStyle={{
								textAlign: "left",
								display: "inline-block",
								padding: "0 1.25rem",
							}}
						>
							{`
Row1 = student, [course1, course2]
User1 and User2 reads Row1
User1 Adds course3 to Row1 and press submit
User2 Remove course2 to Row1 and press submit
Result: Row1 = student, [course1]
                `}
						</SyntaxHighlighter>
					</div>
					<ArticleHeading level={3} className="mb-2">
						2<sup>nd</sup> Normal Form
					</ArticleHeading>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							Be in 1<sup>st</sup> Normal Form
						</div>
						<div className="text-base text-center mb-2 italic">
							There should be no partial dependency
						</div>
					</div>
					<ArticleText className="mt-5 mb-3">
						What 2<sup>nd</sup> Normal Form means is that we should ensure that
						the relationship between the different domains are stored in a
						separate table, together with the data that is dependent on that
						relationship. For this case we have 2 different domains, student and
						course. The relationship table would allow us to know which courses
						the student are taking and its resulting grade. Therefore we end up
						with the following design:
					</ArticleText>
					<div className="text-base text-center mb-3">
						<SyntaxHighlighter
							language="sql"
							style={docco}
							customStyle={{
								textAlign: "left",
								display: "inline-block",
								padding: "0 1.25rem",
							}}
						>
							{`
Student (StudentId, Student, Major, Advisor)
StudentCourse (StudentId, CourseId, Grade)
Course (CourseId, Course)
                `}
						</SyntaxHighlighter>
					</div>
					<ArticleText className="mb-7">
						This dependency table allows us to keep our data clean. Notice that
						before we used to have a lot of repeated data if we were to populate
						our StudentCourse table. The course data for all the students taking
						the same course will repeat for every record. This repeated data is
						bad because if we want to update the course information we have to
						find all the records containing the course details and update it. If
						there are 1 billion records in the database, this operation will a
						long time to complete. This change will also allow simultaneous
						updates of the course grade and the course information. E.g. Admin
						Staff updates the course information while the professor keys in the
						grades for the student. Both transactions can occur without
						interfering with each other.
					</ArticleText>
					<ArticleHeading level={3} className="mb-2">
						3<sup>rd</sup> Normal Form
					</ArticleHeading>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							Be in 2<sup>nd</sup> Normal Form
						</div>
						<div className="text-base text-center mb-2 italic">
							No transitive functional dependencies
						</div>
					</div>
					<ArticleText className="mt-5 mb-3">
						In order to get a table into the 3<sup>rd</sup> normal form, we need
						to take a look at each table in 2<sup>nd</sup> Normal Form and ask
						ourselves if it contains any further dependencies that should be
						separated. If we look at the student table, we will notice that it
						actually consist of 2 types information, the student information and
						the major along with their advisor. There is a dependency here as a
						student can take multiple majors, hence it is possible for a student
						to have 2 records in this table. In order to remove this dependency
						we should store these 2 items in separate tables.
					</ArticleText>
					<div className="text-base text-center mb-3">
						<SyntaxHighlighter
							language="sql"
							style={docco}
							customStyle={{
								textAlign: "left",
								display: "inline-block",
								padding: "0 1.25rem",
							}}
						>
							{`
Student (StudentId, Student)
StudentMajor (StudentId, Major, Advisor)
StudentCourse (StudentId, CourseId, Grade)
Course (CourseId, Course)
                `}
						</SyntaxHighlighter>
					</div>
					<ArticleHeading level={3} className="mb-2">
						Boyce-Codd Normal Form(BCNF)
					</ArticleHeading>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							Be in 3<sup>rd</sup> Normal Form
						</div>
						<div className="text-base text-center mb-2 italic">
							A relation is in BCNF if, and only if, every determinant is a
							candidate key.
						</div>
					</div>
					<div className="text-base mt-5 mb-3">
						BCNF is actually a special case of 3<sup>rd</sup> Normal Form and is
						highly depended on the business rules. To keep things simple we will
						be focusing on the StudentMajor table. Let&apos;s say we have the
						following business rules:
						<ol>
							<li>A Student can have multiple Majors</li>
							<li>For each Major, a Student have 1 Advisor</li>
							<li>A Major have several Advisors</li>
							<li>An Advisor can only advise one Major</li>
							<li>An Advisor can advise many Students</li>
						</ol>
					</div>
					<div className="text-base text-center mb-3">
						<SyntaxHighlighter
							language="sql"
							style={docco}
							customStyle={{
								textAlign: "left",
								display: "inline-block",
								padding: "0 1.25rem",
							}}
						>
							{`
StudentMajor (StudentId, Advisor, Major)
                `}
						</SyntaxHighlighter>
					</div>
					<ArticleText className="mb-3">
						If we take a look at our previous table design above we can see that
						we are not able to establish these business rules. From the table
						above we have no idea if Advisor can advise several Majors, or if a
						Major can have several Advisors. The only way we are able to
						establish these business rules is to split the tables into the
						following.
					</ArticleText>
					<div className="text-base text-center mb-3">
						<SyntaxHighlighter
							language="sql"
							style={docco}
							customStyle={{
								textAlign: "left",
								display: "inline-block",
								padding: "0 1.25rem",
							}}
						>
							{`
StudentAdvisor (StudentId, AdvisorId)
AdvisorMajor (AdvisorId, Advisor, MajorId)
Major (MajorId, Major)
                `}
						</SyntaxHighlighter>
					</div>
					<ArticleText className="mb-7">
						By looking at the table above, we can now see. A student have an
						Advisor. An Advisor advises one major and a Major can have several
						advisors.
					</ArticleText>
					<ArticleHeading level={2} className="mb-2">
						Conclusion
					</ArticleHeading>
					<ArticleText className="mb-3">
						The database of our web application is our user&apos;s single source
						of truth. Therefore, we need to design it using the normalization
						rules to reduce redundancies and anomalies. To help developers, some
						companies employ a Database Administrator to approve the database
						design.
					</ArticleText>
					<ArticleText className="mb-3">
						In addition, although the advantages of database normalization
						cannot be seen immediately, an incorrectly designed database will
						result in huge re-writes in the future. This will hinder the
						development velocity of a particular product. It may also result in
						performance issues as the application scales to handle thousands if
						not millions of users.
					</ArticleText>
					<ArticleText className="mb-3">
						Now that we have covered the basics of backend design, I will be
						covering more of the frontend portion of the sprint planning in the
						following week.
					</ArticleText>
					<GoogleAds slotId="5394074780" />
					<div className="text-center my-5">
						<div className="text-gray-600 text-center mb-3">
							Next Article: Designing the Interface coming on 07/03/2022
						</div>
					</div>
					<div className="text-xs text-gray-600 text-right mb-3">
						Last Updated: 28/02/2022
					</div>
				</ContentContainer>
			</ArticleContainer>
		</StandardLayout>
	);
}
