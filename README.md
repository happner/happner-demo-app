# happner-demo-app
A monorepo demonstrating the suggested architecture and patterns to use in a typical Happner real-time application.

The application is a very simple chat app, where users can open a basic client and communicate with each other via the
Happner mesh.

## Project goals

To illustrate the following:

- best-practice architecture, using an OO (object-oriented) approach and [SOLID](https://en.wikipedia.org/wiki/SOLID) principles
  - S: single responsibility
  - O: open-closed
  - L: Liskov substitution
  - I: interface segregation
  - D: dependency inversion
- the use of well-known design patterns, such as:
  - facade
  - gateway
  - event bus
  - builder
  - singleton
  - factory
- TDD (test-driven development)
  - unit/integration/functional tests
  - mocking/stubbing