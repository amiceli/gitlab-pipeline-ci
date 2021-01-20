# gitlab-pipeline-cli

gitlab-pipeline-cli allow to see in realtime (every 5s) project pipeline status.

If you prefer nodeJS version see [v1.0.0 branch](https://github.com/amiceli/gitlab-pipeline-ci/tree/v1.0.0)

## How to run

    deno run --allow-net index.ts --project <project-id> --token <gitlab-token> --url <gitlab-url> --limit <limit:optional>

## How to install

    deno install --allow-net https://raw.githubusercontent.com/amiceli/gitlab-pipeline-ci/master/index.ts