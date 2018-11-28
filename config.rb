# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :directory_indexes

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false



# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end
#
helpers do
  def euro_countries
    {
      'Austria' => 'AT',
      'Belgium'  => 'BE',
      'Bulgaria' =>'BG',
      'Czech Republic' => 'CZ',
      'Croatia' => 'HR',
      'Cyprus' => 'CY',
      'Denmark' => 'DK',
      'Estonia' => 'EE',
      'Finland' => 'FI',
      'Germany' => 'DE',
      'Greece' => 'EL',
      'Ireland' => 'IE',
      'France' => 'FR',
      'Hungary' => 'HU',
      'Italy' => 'IT',
      'Latvia' => 'LV',
      'Lithuania' => 'LT',
      'Luxembourg' => 'LU',
      'Malta' => 'MT',
      'Netherlands' => 'NL',
      'Poland' => 'PL',
      'Portugal' => 'PT',
      'Romania' => 'RO',
      'Slovenia' => 'SI',
      'Slovakia' => 'SK',
      'Spain' => 'ES',
      'Sweden' => 'SE',
      'United Kingdom' => 'UK'
    }
  end

  def euro_countries_by_code
    euro_countries.inject({}) do |sum, country|
      sum[country.last] = country.first
      sum
    end
  end
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end

activate :deploy do |deploy|
  deploy.deploy_method = :git
  # Optional Settings
  # deploy.remote   = 'custom-remote' # remote name or git url, default: origin
  # deploy.branch   = 'custom-branch' # default: gh-pages
  # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
  # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
end
