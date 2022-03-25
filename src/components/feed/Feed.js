import { Grid, GridItem, Heading } from '@chakra-ui/react';
import PostPreview from './PostPreview';

export default function Feed() {
  return (
    <Grid
      h='100vh'
      templateRows='repeat(10, 1fr)'
      templateColumns='repeat(2, 1fr)'
      gap={4}
      mt="16"
    >
      <GridItem rowSpan={1} colSpan={1}>
        <Heading as='h3' size='lg' align='left'>
          Latest posts
        </Heading>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <PostPreview
          title='My first post'
          desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          category='general'
          author='Satoshi Nakamoto'
          role='BTC master'
          avatar='https://bit.ly/sage-adebayo'
          date='17-03-2022 12:00 AM'
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <PostPreview
          title='My second post'
          desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          category='finance'
          author='Martin Odersky'
          role='Computer scientist'
          avatar='https://bit.ly/sage-adebayo'
          date='16-03-2022 11:00 PM'
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <PostPreview
          title='My third post'
          desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          category='ideas'
          author='Sir Isaac Newton'
          role='Inventor'
          avatar='https://bit.ly/sage-adebayo'
          date='15-03-2022 2:00 PM'
        />
      </GridItem>
    </Grid>
  );
}
