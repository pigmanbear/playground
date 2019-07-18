# Glossary of Common Terms

__ACL__
: Access Control List

__AMI__
:Amazon Machine Image

__APIG__
:API Gateway

__ARN__
:Amazon Resource Name

__BaaS__
: Backend As a Service

__CDN__
: Content Delivery Network

__CFT__
: CloudFormation Template

__DDB__
: Dynamo Database

__DMS__
: Data Migration Service

__DOM__
: Document Object Model

__EC2__
: Elastic Compute Cloud

__ECS__
: Elastic Container Service

__EMR__
: Elastic Map Reduce

__FaaS__
: Functions As A Service

__IaaS__
: Infrastructure As A Service

__IaC__
: Infrastructure as Code

__KMS__
: Key Management Service

__PWA__
: Progressive Web Application

__RDS__
: Relational Database Service

__S3__
: Simple Storage Service

__SaaS__
: Software As A Service

__SAM__
: Serverless Application Model

__SAR__
: Serverless Application Repository

__SNS__
: Simple Notification Service

__SQS__
: Some Definition

__SSE__
: Server Side Encryption

__VPC__
: Virtual Private Cloud

__AppSync__
: Hosted GraphQL as a Service

__Cold Start__
: Execution of an inactice Function (in FaaS)

__Container__
: A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.

__Docker__
: Docker packages software into standardized units (containers) that have everything the software needs to run including libraries, system tools, code, and runtime using. The container is virtualized and independent of the host OS.

__Event Driven Architecture__
: Characterized by loosely coupled components commonly with event/message producers, event/message consumers, streams and queues for real time (or near real time) processing with the goal of a responsive, resilient, elastic, message driven system

__Fanout__
: Pattern for messages to be delivered to multiple receviers for downstream processing

__GraphQL__
:  GraphQL is not a programming language capable of arbitrary computation; it a language used to query application servers that have capabilities defined in a specification. It is langauge agnostic and implementations exist in a variety of languages. 

__idempotent__ _(pure function)_
: An idempotent operation is an operation, action, or request that can be applied multiple times yielding the same result, i.e. stateless. See referential transparency.


__Kappa Architecture__
: Data Flow architecture characterized by the concept of an append only immutable log and fed into streaming computation system for consumption of data serving layers optimized for application queries - with important implications for migration, ETL, data processing

__Kinesis__
: Streaming service

* _Amazon Kinesis Data Streams_ is a scalable and durable real-time data streaming service that can continuously capture gigabytes of data per second from hundreds of thousands of source
* _Amazon Kinesis Data Firehose_ capture, transform, and load data streams into AWS data stores for near real-time analytics with existing business intelligence tools.
* _Amazon Kinesis Data Analytics_ process data streams in real time

__Kubernetes__
: Kubernetes is an open source system for managing containerized applications; a portable, extensible, open-source platform for managing containerized workloads and services, facilitating both declarative configuration and automation

__AWS Lambda__ service that lets you run code without provisioning or managing servers.

__Lambda Event Source Mapping__
: An event source mapping is an AWS Lambda resource that reads from an event source and invokes a Lambda function.

__referential transparency__
: expression of function call can be replaced by result without affecting the program result

__Serverless__ (as framework)
: Framework for written in Nodejs supporting multiple cloud providers for developing serverless applications

__serverless__ (as model)
: Serverless exhibits five common traits

* Requires no management of Server hosts or Server processes
* Self auto-scales and auto-provisions, based on load
* Offers costs based on precise usage
* Has performance capabilities defined in terms other than host size / count
* Has implicit High Availability
  
__streams__
: Collections of data, similar arrays or strings. Sstreams might not be available all at once, and they don’t have to fit in memory

__Terraform__
: IaC tool similar to Serverless Framework

__Warm Start__
: Reuse of existing container still active after completion and not yet terminated (in FaaS)
