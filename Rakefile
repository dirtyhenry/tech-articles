namespace :bootstragram do
  desc "Open development site"
  task :open do
    sh "open http://bootstragram-blog.dev/"
  end

  desc "Create directories for Pow"
  task :create_pow_dirs do
    sh "mkdir -p ~/Developer/build/bootstragram-blog-pow"
    sh "mkdir -p _site"
    sh "ln -Ffvs $PWD/_site/ ~/Developer/build/bootstragram-blog-pow/public"
    sh "ln -Ffhvs ~/Developer/build/bootstragram-blog-pow/ ~/.pow/bootstragram-blog"
  end
end
