output "deployed_bucket_name" {
  value = data.aws_s3_bucket.selected.id
}
output "distribution_id" {
  value = aws_cloudfront_distribution.ui.id
}
output "cf_domain" {
  value = aws_cloudfront_distribution.ui.domain_name
}
