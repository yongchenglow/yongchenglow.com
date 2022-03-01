import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Link as MuiLink,
  TableContainer,
  Paper,
  styled,
  tableCellClasses,
} from '@mui/material';
import Footer from '../components/footer';
import ResponsiveAppBar from '../components/appbar';
import theme from 'src/theme';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { StyledTableCell, StyledTableRow } from './2';

type OnDelete = {
  action: string;
  description: string;
};

const deleteActions: OnDelete[] = [
  {
    action: 'NO ACTION (Default)',
    description: 'Referenced row will not be deleted',
  },
  {
    action: 'RESTRICT',
    description: 'Prevents Deletion of Primary Key',
  },
  {
    action: 'CASCADE',
    description: 'Referenced rows will be deleted as well',
  },
];

const About = () => {
  return (
    <Box height="100vh" marginTop={8} display="flex" flexDirection="column">
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <Box py={3}>
          <Typography variant="h3" textAlign="center" marginBottom={1}>
            Single Source of Truth
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            textAlign="center"
            marginBottom={4}
          >
            Creating a reliable Database
          </Typography>
          <Box maxWidth="sm" mx="auto" mb={4}>
            <img
              style={{ width: '100%' }}
              src="/img/database-schema-gf6a494e82_1280.png"
              alt="database"
            />
          </Box>
          <Box maxWidth="md" mx="auto">
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              One of the most important software engineering principles is to
              ensure that we have a single source of truth. For the context of
              creating web applications, the single source of truth <b>is</b>{' '}
              the database. Therefore, designing a database to reliably store
              and manipulate data is one of our utmost priorities.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={7}
            >
              To keep things simple for this beginner series, we will focus on a
              SQL Database. Examples will be given using an open-source Database
              Engine known as PostgreSQL. For other SQL Engines, e.g., Oracle,
              their syntax may slightly differ, however, the similar principles
              will apply. We will also be narrowing our scope to learn about
              database constraints and normalization. Other topics such as
              security and performance will be left for another day.
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              Database Constraints
            </Typography>
            <Box maxWidth="sm" mx="auto" mb={4}>
              <img
                style={{ width: '100%' }}
                src="/img/server-gebd52a943_1280.jpg"
                alt="constraints"
              />
            </Box>
            <Box my={3} maxWidth="sm" mx="auto">
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                <MuiLink
                  href="https://www.postgresql.org/docs/current/datatype.html"
                  target="_blank"
                >
                  <b>Database constraints </b>
                </MuiLink>{' '}
                give you control over the data stored inside the tables
              </Typography>
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              In order to ensure that our database is the single source of
              truth, we need to ensure that our validations occur at the
              database level. This can be done by adding constraints to what we
              can store in our database through the different kinds of data
              types.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              Let's say we want to store a user's username into our database. We
              will be using a character varying data type. We can further
              strengthen the database validation by limiting the username to be
              a maximum of 50 characters long:
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={7}
            >
              <SyntaxHighlighter language="sql" style={docco}>
                {
                  'CREATE TABLE user(id serial primary key, username varchar(50));'
                }
              </SyntaxHighlighter>
            </Typography>
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              Checks
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              In addition to using the different data types that Postgres
              provides, we can also add additional constraints. Let's say we
              want to store the price of an item in the database. Logically
              speaking we would want to store the price as a non-negative number
              with 2 decimal places. We can achieve this in the following manner
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language="sql"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
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
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={10}
            >
              The{' '}
              <SyntaxHighlighter
                language="sql"
                style={docco}
                customStyle={{
                  display: 'inline-block',
                  margin: 0,
                  padding: 0,
                  overflowX: 'visible',
                  fontSize: '20px',
                }}
              >
                {`numeric(5,2)`}
              </SyntaxHighlighter>{' '}
              allows us to have a maximum and minimum of 5 digits of which 2 are
              decimal points(-999.99 to 999.99)
            </Typography>
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              Primary Keys
            </Typography>
            <Box my={3} maxWidth="sm" mx="auto">
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                <b>Primary Keys</b> are a unique identifier for a row of data
              </Typography>
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={7}
            >
              Primary keys are usually indexed automatically by the database to
              allow for fast access. For example, according to PostgreSQL
              documentation a B-Tree index is automatically created for primary
              keys.
            </Typography>
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              Foreign keys
            </Typography>
            <Box my={3} maxWidth="sm" mx="auto">
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                <b>Foreign keys</b> are references to a row with a primary key
                in another table
              </Typography>
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              For Foreign keys, there are additional behavours that you can set
              when the primary key is deleted.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language="sql"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
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
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Action</StyledTableCell>
                    <StyledTableCell align="center">
                      Description
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deleteActions.map((deleteEvent) => (
                    <StyledTableRow
                      key={deleteEvent.action}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {deleteEvent.action}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {deleteEvent.description}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign="center"
              marginTop={10}
              marginBottom={2}
            >
              Not Null
            </Typography>
            <Box my={3} maxWidth="sm" mx="auto">
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                <b>Not Null</b> constraint does not allow null values
              </Typography>
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              It is important to note that null does not mean empty string. If
              you want to validate for a non-empty string, you need to add an
              additional length check.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={7}
            >
              <SyntaxHighlighter
                language="sql"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
CREATE TABLE user (
  id serial primary key,
  username VARCHAR NOT NULL CONSTRAINT non_empty CHECK(length(username) > 0)
)
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              Unique
            </Typography>
            <Box my={3} maxWidth="sm" mx="auto">
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                <b>Unique</b> contraint means that every value in the column
                must be unique
              </Typography>
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              It is important to note that a unique contain can also be placed
              on multiple columns at the same time. For example, if we want to
              go back to our trustworthy AirBnB application, lets say we want to
              create a favourites table to store flats that the user saved. In
              order to prevent double insertions (saving to favorites twice), we
              add a unique constraint on user_id and flat_id
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language="ruby"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
class CreateFavourites < ActiveRecord::Migration[6.1]
  def change
    create_table :favourites do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.references :flat, null: false, foreign_key: true, index: true
      t.timestamps
    end
    add_index :favourites, [:user_id, :flat_id], unique: true
  end
end
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              textAlign="center"
              marginTop={7}
              marginBottom={2}
            >
              Database Normalization
            </Typography>
            <Box maxWidth="sm" mx="auto" mb={4}>
              <img
                style={{ width: '100%' }}
                src="/img/database-g2fad27680_1280.jpg"
                alt="database normalization"
              />
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
              sx={{ fontStyle: 'italic' }}
            >
              <MuiLink
                href="https://opentextbc.ca/dbdesign01/chapter/chapter-12-normalization/"
                target="_blank"
              >
                <b>Normalization</b>
              </MuiLink>{' '}
              is a database design technique that reduces data redundancy, and
              anomalies.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              Now that we have talk about the different database constrains for
              each column, we will now turn our attention to the table itself.
              To keep things simple, we will only focus from 1<sup>st</sup>{' '}
              Normal Form to 3.5 Normal Form, otherwise known as Boyce-Codd
              normal form(BCNF) which is usually the requirements needed to pass
              most technical assessments. There are greater levels of{' '}
              <MuiLink
                href="https://www.guru99.com/database-normalization.html"
                target="_blank"
              >
                normalization
              </MuiLink>{' '}
              but we won't be covering them here.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={7}
            >
              To keep things simple for the examples, we will assume that
              columns without the word ID contains more information related to
              that domain. E.g. Student will be used to represent StudentName,
              StudentAge etc.
            </Typography>
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              1<sup>st</sup> Normal Form
            </Typography>
            <Box my={3} maxWidth="sm" mx="auto">
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                Each Table Cell should contain a single value
              </Typography>
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                Values stored in a column should be of the same data type
              </Typography>
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                Columns and Tables should have unique names
              </Typography>
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                Order in which the data is stored should not matter
              </Typography>
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginTop={5}
              marginBottom={3}
            >
              Let's say we have to store the following information in the
              database about a students' grade report.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language="sql"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
Student_Grade_Report (StudentId, Student, Major, Advisor, [Course, Grade])
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              It is easy to identify from the current table design that one
              student will take multiple courses and obtain one grade for each
              course. However, in order to satisfy the rule of each table cell
              should contain a single value and not an array of value, we should
              split the tables into the following manner.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language="sql"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
Student (StudentId, Student, Major, Advisor)
StudentCourse (StudentId, Course, Grade)
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              So why do we want to divide the data this way, and why is it
              better? Well first of all, notice that by dividing the table into
              2, updates can safely occur to both tables at the same time. If we
              were to go with our original design, if 2 read and writes were to
              occur at almost the same time, the data of one may override
              another:
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language=""
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
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
            </Typography>
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              2<sup>nd</sup> Normal Form
            </Typography>
            <Box my={3} maxWidth="sm" mx="auto">
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                Be in 1<sup>st</sup> Normal Form
              </Typography>
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                There should be no partial dependency
              </Typography>
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginTop={5}
              marginBottom={3}
            >
              What 2<sup>nd</sup> Normal Form means is that we should ensure
              that the relationship between the different domains are stored in
              a separate table, together with the data that is dependent on that
              relationship. For this case we have 2 different domains, student
              and course. The relationship table would allow us to know which
              courses the student are taking and its resulting grade. Therefore
              we end up with the following design:
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language="sql"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
Student (StudentId, Student, Major, Advisor)
StudentCourse (StudentId, CourseId, Grade)
Course (CourseId, Course)
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={7}
            >
              This dependency table allows us to keep our data clean. Notice
              that before we used to have a lot of repeated data if we were to
              populate our StudentCourse table. The course data for all the
              students taking the same course will repeat for every record. This
              repeated data is bad because if we want to update the course
              information we have to find all the records containing the course
              details and update it. If there are 1 billion records in the
              database, this operation will a long time to complete. This change
              will also allow simultaneous updates of the course grade and the
              course information. E.g. Admin Staff updates the course
              information while the professor keys in the grades for the
              student. Both transactions can occur without interfering with each
              other.
            </Typography>
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              3<sup>rd</sup> Normal Form
            </Typography>
            <Box my={3} maxWidth="sm" mx="auto">
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                Be in 2<sup>nd</sup> Normal Form
              </Typography>
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                No transitive functional dependencies
              </Typography>
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginTop={5}
              marginBottom={3}
            >
              In order to get a table into the 3<sup>rd</sup> normal form, we
              need to take a look at each table in 2<sup>nd</sup> Normal Form
              and ask ourselves if it contains any further dependencies that
              should be separated. If we look at the student table, we will
              notice that it actually consist of 2 types information, the
              student information and the major along with their advisor. There
              is a dependency here as a student can take multiple majors, hence
              it is possible for a student to have 2 records in this table. In
              order to remove this dependency we should store these 2 items in
              separate tables.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language="sql"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
Student (StudentId, Student)
StudentMajor (StudentId, Major, Advisor)
StudentCourse (StudentId, CourseId, Grade)
Course (CourseId, Course)
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              Boyce-Codd Normal Form(BCNF)
            </Typography>
            <Box my={3} maxWidth="sm" mx="auto">
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                Be in 3<sup>rd</sup> Normal Form
              </Typography>
              <Typography
                fontSize={theme.typography.h6.fontSize}
                textAlign="center"
                marginBottom={2}
                sx={{ fontStyle: 'italic' }}
              >
                A relation is in BCNF if, and only if, every determinant is a
                candidate key.
              </Typography>
            </Box>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginTop={5}
              marginBottom={3}
            >
              BCNF is actually a special case of 3<sup>rd</sup> Normal Form and
              is highly depended on the business rules. To keep things simple we
              will be focusing on the StudentMajor table. Let's say we have the
              following business rules:
              <ol>
                <li>A Student can have multiple Majors</li>
                <li>For each Major, a Student have 1 Advisor</li>
                <li>A Major have several Advisors</li>
                <li>An Advisor can only advise one Major</li>
                <li>An Advisor can advise many Students</li>
              </ol>
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language="sql"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
StudentMajor (StudentId, Advisor, Major)
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              If we take a look at our previous table design above we can see
              that we are not able to establish these business rules. From the
              table above we have no idea if Advisor can advise serveral Majors,
              or if a Major can have several Advisors. The only way we are able
              to establish these business rules is to split the tables into the
              following.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              textAlign="center"
              marginBottom={3}
            >
              <SyntaxHighlighter
                language="sql"
                style={docco}
                customStyle={{
                  textAlign: 'left',
                  display: 'inline-block',
                  padding: theme.spacing(0, 5),
                }}
              >
                {`
StudentAdvisor (StudentId, AdvisorId)
AdvisorMajor (AdvisorId, Advisor, MajorId)
Major (MajorId, Major)
                `}
              </SyntaxHighlighter>
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={7}
            >
              By looking at the table above, we can now see. A student have an
              Advisor. An Advisor advises one major and a Major can have several
              advisors.
            </Typography>
            <Typography
              variant="h4"
              fontWeight={500}
              textAlign="center"
              marginBottom={2}
            >
              Conclusion
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              The database of our web application is our user's single source of
              truth. Therefore, we need to design it using the normalization
              rules to reduce redundancies and anomalies. To help developers,
              some companies employ a Database Administrator to approve the
              database design.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              In addition, although the advantages of database normalization
              cannot be seen immediately, an incorrectly designed database will
              result in huge re-writes in the future. This will hinder the
              development velocity of a particular product. It may also result
              in performance issues as the application scales to handle
              thousands if not millions of users.
            </Typography>
            <Typography
              fontSize={theme.typography.h6.fontSize}
              marginBottom={3}
            >
              Now that we have covered the basics of backend design, I will be
              covering more of the frontend portion of the sprint planning in
              the following week.
            </Typography>
            <Box textAlign="center" my={5}>
              {' '}
              <Typography
                color="textSecondary"
                textAlign="center"
                marginBottom={3}
              >
                Next Article: Designing the Interface coming on 07/03/2022
              </Typography>
            </Box>
            <Typography
              fontSize={theme.typography.caption.fontSize}
              color="textSecondary"
              textAlign="right"
              marginBottom={3}
            >
              Last Updated: 28/02/2022
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default About;
