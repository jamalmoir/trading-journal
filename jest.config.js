module.exports = {
	"roots": [
		"<rootDir>/src"
	],
	// "transform": {
	//   "^.+\\.tsx?$": "ts-jest"
	// },
	"transform": {
		"^.+\\.tsx?$": "ts-jest",
		"^.+\\.jsx?$": "babel-jest",
		// "^.+\\.[t|j]sx?$": "babel-jest"
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js",
	},
	"moduleNameMapper": {
      "\\.(css|less|scss)$": "identity-obj-proxy"
  },
	// Setup Enzyme
	"snapshotSerializers": ["enzyme-to-json/serializer"],
	"setupTestFrameworkScriptFile": "<rootDir>/setupEnzyme.ts",
}