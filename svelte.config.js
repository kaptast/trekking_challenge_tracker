import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = { 
    kit: { 
        adapter: adapter({
            regions: ['fra1']
        }), 
        experimental: { 
            remoteFunctions: true 
        }
    },
    compilerOptions: {
        experimental: {
            async: true
        }
    }
}

export default config
