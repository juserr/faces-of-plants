# Faces of Plants – FAQ & Troubleshooting

## Why is my custom domain not resolving?
- DNS changes can take up to 30 minutes to propagate.
- Make sure your Route53 A record (Alias) points to your CloudFront distribution.
- For CloudFront, the ACM certificate must be in us-east-1 (N. Virginia).
- For API Gateway, the ACM certificate must be in the same region as your API (eu-central-1).
- Check that the certificate is in the "Issued" state, not "Pending validation".

## How do I set secrets for Lambda functions?
- Use `sst secret set LLM_API_KEY <value> --stage dev` (or `--stage production`).
- Do not rely on `.env` for Lambda secrets—use SST secrets for all Lambda environment variables.

## How do I rotate or update a secret?
- Run `sst secret set LLM_API_KEY <new-value> --stage <stage>`.
- Redeploy your stack to update Lambda environment variables.

## How do I troubleshoot deployment errors?
- Run `sst logs --stage <stage>` to view Lambda and deployment logs.
- Check CloudFormation events in the AWS Console for more details.
- Common issues: missing secrets, handler path typos, certificate region mismatch.

## How do I remove all AWS resources?
- Run `pnpm run remove --stage <stage>` to remove all resources for a stage.

## Where do I find more documentation?
- See the main `README.md` for architecture, setup, and deployment.
- For infrastructure, see `sst.config.ts` and this `docs/faq.md` file.
