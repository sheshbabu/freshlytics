# Troubleshooting

## I can't see the events

- See if the Base URL is set properly in the tracking snippet
- It should point to the server that is hosting the freshlytics system
- Make sure the `COLLECT_URL` in tracking snippet is `<BASE_URL>/api/collect` and not `<BASE_URL>/collect`
- Try making a CURL request to the freshlytics system using `$ curl <BASE_URL>/api/collect` this should return a `{"message":"project_id not sent"}` error

## Failed to prune sessions: relation "session" does not exist

- Make sure the database migrations and seeding is done as per the instructions in the "Installation" page.
