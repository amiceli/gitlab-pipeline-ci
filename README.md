# gitlab-pipeline-ci

Show last pipelines for specific projects

## Usage

    gitlab-pipeline-cli --project=<project-id> --token=<token> --url=<gitlab-url> --limit=<limit-optional-default-5>

Console will output last 5 (or more/less) pipeline for specified project and refresh every 5 seconds.

For **gitlab-url** you need to specify http:// or https:// .

## Todo

[ ] Add parameter for timeout
