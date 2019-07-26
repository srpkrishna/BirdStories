# BirdStories
Responsive web app where writers can upload stories/articles and reads can read the stories arranged on decreasing order of uploaded timestamp. 

# Architecture And Technology

Application is hosted using AWS Elastic bean stalk.

  Client: Technologies used are HTML+JS+React. Architecture used is Redux. More info of redux at https://redux.js.org/ <br>
  Server: Technologies used are Node+Express4.0. <br>
  Database: No sql data base AWS dynamoDB is used.
  
Load balancer is added to manage the load between instances and AWS ElasticBeanstalk takes care of scaling. Based on load it will create and destroy the server instances. DynamoDB is serverless, auto scalable and disturbuted. More info can be found at https://aws.amazon.com/dynamodb/

