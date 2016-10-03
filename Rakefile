namespace :bootstragram do
  desc "Open development site"
  task :open do
    sh "open http://bootstragram-blog.dev/"
  end

  desc "Publish via GIT push"
  task :publish do
    sh "git push deploy master"
  end

  desc "Create directories"
  task :create_dir do
    sh "mkdir -p ~/Developer/build/bootstragram-blog-gh-pages"
    sh "mkdir -p ~/Developer/build/bootstragram-blog-pow"
    sh "ln -Ffvs ~/Developer/build/bootstragram-blog-gh-pages ~/Developer/build/bootstragram-blog-pow/public"
    sh "cd ~/.pow && ln -s ~/Developer/build/bootstragram-blog-pow bootstragram-blog"
  end
end
