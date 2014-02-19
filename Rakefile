namespace :bootstragram do 
  desc "Compile LESS sources and run jekyll in WATCH mode"
  task :run do
    sh "/usr/local/bin/lessc _less/bootstragram.less assets/css/bootstragram.css"
    sh "/usr/local/bin/lessc _less/bootstragram-print.less assets/css/bootstragram-print.css"
    sh "jekyll serve --watch"
  end
  
  desc "Open development site"
  task :open do
    sh "open http://bootstragram-blog.dev/blog/"
  end
  
  desc "Publish via GIT push"
  task :publish do 
    sh "git push deploy master"
  end
end