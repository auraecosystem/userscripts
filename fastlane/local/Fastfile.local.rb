# fastlane/local/Fastfile.local.rb

#############################################
# Local Developer Configuration
#############################################

UI.message("Loading Aura Playground local Fastlane configuration...")

before_all do
  ENV["FASTLANE_SKIP_UPDATE_CHECK"] ||= "1"
end

#############################################
# Local iOS Lanes
#############################################

platform :ios do

  desc "Build iOS locally without uploading"
  lane :local_build do
    build_app(
      project: PROJECT_PATH,
      scheme: IOS_SCHEME,
      clean: true,
      output_directory: OUTPUT_DIR,
      output_name: "AuraPlayground-iOS-Local"
    )
  end

  desc "Run iOS tests"
  lane :local_test do
    run_tests(
      project: PROJECT_PATH,
      scheme: IOS_SCHEME
    )
  end

end

#############################################
# Local macOS Lanes
#############################################

platform :mac do

  desc "Build macOS locally without uploading"
  lane :local_build do
    build_mac_app(
      project: PROJECT_PATH,
      scheme: MAC_SCHEME,
      clean: true,
      output_directory: OUTPUT_DIR,
      output_name: "AuraPlayground-macOS-Local"
    )
  end

end

#############################################
# Utilities
#############################################

desc "Clean build artifacts"

lane :clean do
  clear_derived_data
  sh("rm -rf build")
end

desc "Show current configuration"

lane :info do
  UI.message("Project: #{PROJECT_PATH}")
  UI.message("iOS Scheme: #{IOS_SCHEME}")
  UI.message("macOS Scheme: #{MAC_SCHEME}")
  UI.message("Bundle ID: #{ENV['FL_APP_IDENTIFIER']}")
end
