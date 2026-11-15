// The conventional preset already enforces the type list, lowercase types,
// a non sentence-case subject, and non-empty type and subject. Only deliberate
// departures from it belong here.
export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"header-max-length": [2, "always", 72],
	},
};
