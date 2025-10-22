import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeCleint = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token
})

if (!(writeCleint.config().token)) {
  throw new Error("Write token not found. Please check .env.local for SANITY_WRITE_TOKEN.")
}
