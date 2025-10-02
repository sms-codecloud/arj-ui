# React UI on S3 + CloudFront (Production-ready)

This package creates a static React UI (Vite) that talks to your existing backend API Gateway,
and hosts the UI on **S3 + CloudFront**.

## Structure
- `ui/app/` - React app (Vite). Reads API base from `VITE_API_BASE` at build time.
- `tf-ui-s3cf/` - Terraform for:
  - Private S3 bucket
  - CloudFront distribution (with Origin Access Control)
  - SPA fallback (404/403 → `index.html`)
- `scripts/ui_build_and_upload.ps1` - Build + upload UI to S3, invalidate CloudFront.
- `Jenkinsfile_ui` - Jenkins pipeline for infra and deployment.

## Quick start
1. Terraform apply in `tf-ui-s3cf` with:
   - `aws_region`
   - `bucket_name` (globally unique).
2. Build React app with:
   ```bash
   VITE_API_BASE=https://<your-backend-api> npm run build
