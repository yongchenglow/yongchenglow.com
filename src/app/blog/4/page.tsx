"use client";

import ArticleCodeBlock from "@/src/components/article/ArticleCodeBlock";
import ArticleContainer from "@/src/components/article/ArticleContainer";
import ArticleContent from "@/src/components/article/ArticleContent";
import ArticleHeader from "@/src/components/article/ArticleHeader";
import ArticleImage from "@/src/components/article/ArticleImage";
import ArticleParagraph from "@/src/components/article/ArticleParagraph";
import ExternalLink from "@/src/components/shared/atoms/ExternalLink";
import GoogleAds from "@/src/components/shared/atoms/GoogleAds";
import StandardLayout from "@/src/components/shared/layouts/StandardLayout";
import Section from "@/src/components/shared/molecules/Section";
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
				<ArticleHeader
					title="Single Source of Truth"
					subtitle="Creating a reliable Database"
				/>
				<ArticleImage
					src="/img/database-schema-gf6a494e82_1280.png"
					alt="database"
				/>
				<ArticleContent>
					<ArticleParagraph>
						One of the most important software engineering principles is to
						ensure that we have a single source of truth. For the context of
						creating web applications, the single source of truth <b>is</b> the
						database. Therefore, designing a database to reliably store and
						manipulate data is one of our utmost priorities.
					</ArticleParagraph>
					<ArticleParagraph>
						To keep things simple for this beginner series, we will focus on a
						SQL Database. Examples will be given using an open-source Database
						Engine known as PostgreSQL. For other SQL Engines, e.g., Oracle,
						their syntax may slightly differ, however, the similar principles
						will apply. We will also be narrowing our scope to learn about
						database constraints and normalization. Other topics such as
						security and performance will be left for another day.
					</ArticleParagraph>
					<Section title="Database Constraints" className="mb-2">
						<></>
					</Section>
					<ArticleImage
						src="/img/server-gebd52a943_1280.jpg"
						alt="constraints"
					/>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							<ExternalLink
								href="https://www.postgresql.org/docs/current/datatype.html"
								target="_blank"
							>
								<b>Database constraints </b>
							</ExternalLink>{" "}
							give you control over the data stored inside the tables
						</div>
					</div>
					<ArticleParagraph>
						In order to ensure that our database is the single source of truth,
						we need to ensure that our validations occur at the database level.
						This can be done by adding constraints to what we can store in our
						database through the different kinds of data types.
					</ArticleParagraph>
					<ArticleParagraph>
						Let&apos;s say we want to store a user&apos;s username into our
						database. We will be using a character varying data type. We can
						further strengthen the database validation by limiting the username
						to be a maximum of 50 characters long:
					</ArticleParagraph>
					<ArticleCodeBlock language="sql" className="mb-7">
						CREATE TABLE user(id serial primary key, username varchar(50));
					</ArticleCodeBlock>
					<Section title="Checks" className="mb-2">
						<></>
					</Section>
					<ArticleParagraph>
						In addition to using the different data types that Postgres
						provides, we can also add additional constraints. Let&apos;s say we
						want to store the price of an item in the database. Logically
						speaking we would want to store the price as a non-negative number
						with 2 decimal places. We can achieve this in the following manner
					</ArticleParagraph>
					<ArticleCodeBlock language="sql" className="mb-3">
						{`CREATE TABLE products (
  id integer primary key,
  name varchar(50),
  price numeric(5,2) CHECK (price >= 0)
);`}
					</ArticleCodeBlock>
					<ArticleParagraph>
						The{" "}
						<code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-base">
							numeric(5,2)
						</code>{" "}
						allows us to have a maximum and minimum of 5 digits of which 2 are
						decimal points(-999.99 to 999.99)
					</ArticleParagraph>
					<Section title="Primary Keys" className="mb-2">
						<></>
					</Section>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							<b>Primary Keys</b> are a unique identifier for a row of data
						</div>
					</div>
					<ArticleParagraph>
						Primary keys are usually indexed automatically by the database to
						allow for fast access. For example, according to PostgreSQL
						documentation a B-Tree index is automatically created for primary
						keys.
					</ArticleParagraph>
					<Section title="Foreign keys" className="mb-2">
						<></>
					</Section>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							<b>Foreign keys</b> are references to a row with a primary key in
							another table
						</div>
					</div>
					<ArticleParagraph>
						For Foreign keys, there are additional behaviors that you can set
						when the primary key is deleted.
					</ArticleParagraph>
					<ArticleCodeBlock language="sql" className="mb-3">
						{`CREATE TABLE order_items (
    product_id integer REFERENCES products ON DELETE RESTRICT,
    order_id integer REFERENCES orders ON DELETE CASCADE,
    quantity integer,
    PRIMARY KEY (product_id, order_id)
);`}
					</ArticleCodeBlock>
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
					<Section title="Not Null" className="mt-10 mb-2">
						<></>
					</Section>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							<b>Not Null</b> constraint does not allow null values
						</div>
					</div>
					<ArticleParagraph>
						It is important to note that null does not mean empty string. If you
						want to validate for a non-empty string, you need to add an
						additional length check.
					</ArticleParagraph>
					<ArticleCodeBlock language="sql" className="mb-7">
						{`CREATE TABLE user (
  id serial primary key,
  username VARCHAR NOT NULL CONSTRAINT non_empty CHECK(length(username) > 0)
)`}
					</ArticleCodeBlock>
					<Section title="Unique" className="mb-2">
						<></>
					</Section>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							<b>Unique</b> constraint means that every value in the column must
							be unique
						</div>
					</div>
					<ArticleParagraph>
						It is important to note that a unique contain can also be placed on
						multiple columns at the same time. For example, if we want to go
						back to our trustworthy AirBnB application, lets say we want to
						create a favorites table to store flats that the user saved. In
						order to prevent double insertions (saving to favorites twice), we
						add a unique constraint on user_id and flat_id
					</ArticleParagraph>
					<ArticleCodeBlock language="ruby" className="mb-3">
						{`class CreateFavorites < ActiveRecord::Migration[6.1]
  def change
    create_table :favorites do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.references :flat, null: false, foreign_key: true, index: true
      t.timestamps
    end
    add_index :favorites, [:user_id, :flat_id], unique: true
  end
end`}
					</ArticleCodeBlock>
					<GoogleAds slotId="5768607169" />
					<Section title="Database Normalization" className="mt-7 mb-2">
						<></>
					</Section>
					<ArticleImage
						src="/img/database-g2fad27680_1280.jpg"
						alt="database normalization"
					/>
					<div className="text-base text-center mb-3 italic">
						<ExternalLink
							href="https://opentextbc.ca/dbdesign01/chapter/chapter-12-normalization/"
							target="_blank"
						>
							<b>Normalization</b>
						</ExternalLink>{" "}
						is a database design technique that reduces data redundancy, and
						anomalies.
					</div>
					<ArticleParagraph>
						Now that we have talk about the different database constrains for
						each column, we will now turn our attention to the table itself. To
						keep things simple, we will only focus from 1<sup>st</sup> Normal
						Form to 3.5 Normal Form, otherwise known as Boyce-Codd normal
						form(BCNF) which is usually the requirements needed to pass most
						technical assessments. There are greater levels of{" "}
						<ExternalLink
							href="https://www.guru99.com/database-normalization.html"
							target="_blank"
						>
							normalization
						</ExternalLink>{" "}
						but we won&apos;t be covering them here.
					</ArticleParagraph>
					<ArticleParagraph>
						To keep things simple for the examples, we will assume that columns
						without the word ID contains more information related to that
						domain. E.g. Student will be used to represent StudentName,
						StudentAge etc.
					</ArticleParagraph>
					<Section
						title={
							<>
								1<sup>st</sup> Normal Form
							</>
						}
						className="mb-2"
					>
						<></>
					</Section>
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
					<ArticleParagraph>
						Let&apos;s say we have to store the following information in the
						database about a students&apos; grade report.
					</ArticleParagraph>
					<ArticleCodeBlock language="sql" className="mb-3">
						Student_Grade_Report (StudentId, Student, Major, Advisor, [Course,
						Grade])
					</ArticleCodeBlock>
					<ArticleParagraph>
						It is easy to identify from the current table design that one
						student will take multiple courses and obtain one grade for each
						course. However, in order to satisfy the rule of each table cell
						should contain a single value and not an array of value, we should
						split the tables into the following manner.
					</ArticleParagraph>
					<ArticleCodeBlock language="sql" className="mb-3">
						{`Student (StudentId, Student, Major, Advisor)
StudentCourse (StudentId, Course, Grade)`}
					</ArticleCodeBlock>
					<ArticleParagraph>
						So why do we want to divide the data this way, and why is it better?
						Well first of all, notice that by dividing the table into 2, updates
						can safely occur to both tables at the same time. If we were to go
						with our original design, if 2 read and writes were to occur at
						almost the same time, the data of one may override another:
					</ArticleParagraph>
					<ArticleCodeBlock language="bash" className="mb-3">
						{`Row1 = student, [course1, course2]
User1 and User2 reads Row1
User1 Adds course3 to Row1 and press submit
User2 Remove course2 to Row1 and press submit
Result: Row1 = student, [course1]`}
					</ArticleCodeBlock>
					<Section
						title={
							<>
								2<sup>nd</sup> Normal Form
							</>
						}
						className="mb-2"
					>
						<></>
					</Section>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							Be in 1<sup>st</sup> Normal Form
						</div>
						<div className="text-base text-center mb-2 italic">
							There should be no partial dependency
						</div>
					</div>
					<ArticleParagraph>
						What 2<sup>nd</sup> Normal Form means is that we should ensure that
						the relationship between the different domains are stored in a
						separate table, together with the data that is dependent on that
						relationship. For this case we have 2 different domains, student and
						course. The relationship table would allow us to know which courses
						the student are taking and its resulting grade. Therefore we end up
						with the following design:
					</ArticleParagraph>
					<ArticleCodeBlock language="sql" className="mb-3">
						{`Student (StudentId, Student, Major, Advisor)
StudentCourse (StudentId, CourseId, Grade)
Course (CourseId, Course)`}
					</ArticleCodeBlock>
					<ArticleParagraph>
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
					</ArticleParagraph>
					<Section
						title={
							<>
								3<sup>rd</sup> Normal Form
							</>
						}
						className="mb-2"
					>
						<></>
					</Section>
					<div className="my-3 max-w-sm mx-auto">
						<div className="text-base text-center mb-2 italic">
							Be in 2<sup>nd</sup> Normal Form
						</div>
						<div className="text-base text-center mb-2 italic">
							No transitive functional dependencies
						</div>
					</div>
					<ArticleParagraph>
						In order to get a table into the 3<sup>rd</sup> normal form, we need
						to take a look at each table in 2<sup>nd</sup> Normal Form and ask
						ourselves if it contains any further dependencies that should be
						separated. If we look at the student table, we will notice that it
						actually consist of 2 types information, the student information and
						the major along with their advisor. There is a dependency here as a
						student can take multiple majors, hence it is possible for a student
						to have 2 records in this table. In order to remove this dependency
						we should store these 2 items in separate tables.
					</ArticleParagraph>
					<ArticleCodeBlock language="sql" className="mb-3">
						{`Student (StudentId, Student)
StudentMajor (StudentId, Major, Advisor)
StudentCourse (StudentId, CourseId, Grade)
Course (CourseId, Course)`}
					</ArticleCodeBlock>
					<Section title="Boyce-Codd Normal Form(BCNF)" className="mb-2">
						<></>
					</Section>
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
					<ArticleCodeBlock language="sql" className="mb-3">
						StudentMajor (StudentId, Advisor, Major)
					</ArticleCodeBlock>
					<ArticleParagraph>
						If we take a look at our previous table design above we can see that
						we are not able to establish these business rules. From the table
						above we have no idea if Advisor can advise several Majors, or if a
						Major can have several Advisors. The only way we are able to
						establish these business rules is to split the tables into the
						following.
					</ArticleParagraph>
					<ArticleCodeBlock language="sql" className="mb-3">
						{`StudentAdvisor (StudentId, AdvisorId)
AdvisorMajor (AdvisorId, Advisor, MajorId)
Major (MajorId, Major)`}
					</ArticleCodeBlock>
					<ArticleParagraph>
						By looking at the table above, we can now see. A student have an
						Advisor. An Advisor advises one major and a Major can have several
						advisors.
					</ArticleParagraph>
					<Section title="Conclusion" className="mb-2">
						<></>
					</Section>
					<ArticleParagraph>
						The database of our web application is our user&apos;s single source
						of truth. Therefore, we need to design it using the normalization
						rules to reduce redundancies and anomalies. To help developers, some
						companies employ a Database Administrator to approve the database
						design.
					</ArticleParagraph>
					<ArticleParagraph>
						In addition, although the advantages of database normalization
						cannot be seen immediately, an incorrectly designed database will
						result in huge re-writes in the future. This will hinder the
						development velocity of a particular product. It may also result in
						performance issues as the application scales to handle thousands if
						not millions of users.
					</ArticleParagraph>
					<ArticleParagraph>
						Now that we have covered the basics of backend design, I will be
						covering more of the frontend portion of the sprint planning in the
						following week.
					</ArticleParagraph>
					<GoogleAds slotId="5394074780" />
					<div className="text-center my-5">
						<div className="text-gray-600 text-center mb-3">
							Next Article: Designing the Interface coming on 07/03/2022
						</div>
					</div>
					<div className="text-xs text-gray-600 text-right mb-3">
						Last Updated: 28/02/2022
					</div>
				</ArticleContent>
			</ArticleContainer>
		</StandardLayout>
	);
}
