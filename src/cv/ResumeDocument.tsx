import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

import {
  cvAchievements,
  cvCertifications,
  cvEducation,
  cvExperience,
  cvHeader,
  cvLanguages,
  cvProjects,
  cvSkills,
  cvSummary,
} from '../data/cv'

/**
 * ATS-friendly resume template.
 *
 * Deliberate constraints, each one a documented parser failure mode:
 *  - Single column throughout. Parsers read linearly, so a sidebar interleaves
 *    job titles with skills and scrambles both.
 *  - No tables, no images, no icon bullets. Some parsers strip table content
 *    outright and none can read a glyph that is not text.
 *  - Contact details are body text on the first page, never a fixed page header,
 *    because headers and footers are commonly discarded.
 *  - Helvetica only, which is a PDF standard font, so text extracts reliably.
 *  - Standard section headings ("Technical Skills", "Work Experience") since
 *    parsers map those exact labels to database fields.
 */

/*
 * Turn off hyphenation. By default the renderer breaks words across lines, which
 * extracts as "pro- fessional" and would split keywords such as "TypeScript"
 * into two tokens that no parser will match.
 */
Font.registerHyphenationCallback((word) => [word])

const PALETTE = {
  text: '#1A1A1A',
  muted: '#4A4A4A',
  rule: '#BFBFBF',
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 34,
    paddingBottom: 36,
    paddingHorizontal: 44,
    fontFamily: 'Helvetica',
    fontSize: 9,
    lineHeight: 1.38,
    color: PALETTE.text,
  },

  name: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 17,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  headline: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: PALETTE.muted,
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 8.5,
    color: PALETTE.muted,
    marginBottom: 1.5,
  },
  contactBlock: {
    marginBottom: 10,
  },

  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    letterSpacing: 1,
    marginBottom: 3,
    paddingBottom: 2.5,
    borderBottomWidth: 0.75,
    borderBottomColor: PALETTE.rule,
  },
  section: {
    marginBottom: 9,
  },

  /* Left aligned rather than justified: with hyphenation off, justifying opens
     large gaps between words. */
  summary: {
    textAlign: 'left',
  },

  skillRow: {
    flexDirection: 'row',
    marginBottom: 2.5,
  },
  skillLabel: {
    fontFamily: 'Helvetica-Bold',
    width: 98,
  },
  skillValue: {
    flex: 1,
  },

  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 1,
  },
  jobRole: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    flex: 1,
  },
  jobPeriod: {
    fontSize: 8.5,
    color: PALETTE.muted,
  },
  jobCompany: {
    fontFamily: 'Helvetica-Oblique',
    fontSize: 9,
    color: PALETTE.muted,
    marginBottom: 2,
  },

  projectName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    marginTop: 3.5,
    marginBottom: 1.5,
  },

  bulletRow: {
    flexDirection: 'row',
    marginBottom: 1.5,
    paddingLeft: 2,
  },
  bulletMark: {
    width: 10,
  },
  bulletText: {
    flex: 1,
    textAlign: 'left',
  },

  stack: {
    fontSize: 8.5,
    color: PALETTE.muted,
    marginTop: 1,
    marginBottom: 1,
    paddingLeft: 2,
  },
  stackLabel: {
    fontFamily: 'Helvetica-Bold',
  },

  entryTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    marginTop: 4,
  },
  entryBody: {
    textAlign: 'left',
  },

  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  eduDegree: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    flex: 1,
  },
  eduInstitution: {
    fontFamily: 'Helvetica-Oblique',
    fontSize: 9,
    color: PALETTE.muted,
    marginBottom: 2,
  },

  pageNumber: {
    position: 'absolute',
    bottom: 22,
    left: 48,
    right: 48,
    textAlign: 'center',
    fontSize: 8,
    color: PALETTE.muted,
  },
})

/*
 * Sections flow across a page break rather than moving wholesale to the next
 * page. Keeping them atomic (wrap={false}) pushed any block that did not fit
 * the remaining space onto a fresh page and left a large gap behind it, which
 * is what turned a two page CV into three.
 */
function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle} minPresenceAhead={28}>
        {title}
      </Text>
      {children}
    </View>
  )
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bulletRow}>
      {/* A literal hyphen, not a glyph bullet, so extraction stays clean. */}
      <Text style={styles.bulletMark}>-</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  )
}

export default function ResumeDocument() {
  return (
    <Document
      title={`${cvHeader.name} - ${cvHeader.title}`}
      author={cvHeader.name}
      subject="Curriculum Vitae"
      keywords="full-stack developer, TypeScript, React, Next.js, NestJS, Node.js, React Native, PostgreSQL, Prisma, Docker"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{cvHeader.name}</Text>
        <Text style={styles.headline}>{cvHeader.title}</Text>
        <View style={styles.contactBlock}>
          {cvHeader.contactLines.map((line) => (
            <Text key={line.join()} style={styles.contactLine}>
              {line.join('  |  ')}
            </Text>
          ))}
        </View>

        <Section title="PROFESSIONAL SUMMARY">
          <Text style={styles.summary}>{cvSummary}</Text>
        </Section>

        <Section title="TECHNICAL SKILLS">
          {cvSkills.map((group) => (
            <View key={group.label} style={styles.skillRow}>
              <Text style={styles.skillLabel}>{group.label}</Text>
              <Text style={styles.skillValue}>{group.value}</Text>
            </View>
          ))}
        </Section>

        {/* Not wrapped, so a long role can break across pages instead of
            leaving a large gap at the foot of page one. */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>

          {cvExperience.map((job) => (
            <View key={`${job.company}-${job.period}`}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobRole}>{job.role}</Text>
                <Text style={styles.jobPeriod}>{job.period}</Text>
              </View>
              <Text style={styles.jobCompany}>
                {job.company}, {job.location}
              </Text>

              {job.projects.map((project, i) => (
                <View key={project.name || `${job.company}-${i}`}>
                  {project.name !== '' && (
                    <Text style={styles.projectName}>{project.name}</Text>
                  )}

                  {project.bullets.map((bullet) => (
                    <Bullet key={bullet}>{bullet}</Bullet>
                  ))}

                  {project.stack !== '' && (
                    <Text style={styles.stack}>
                      <Text style={styles.stackLabel}>Stack: </Text>
                      {project.stack}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>

        <Section title="ADDITIONAL PROJECTS">
          {cvProjects.map((project) => (
            <View key={project.name}>
              <Text style={styles.entryTitle}>{project.name}</Text>
              <Text style={styles.entryBody}>{project.description}</Text>
            </View>
          ))}
        </Section>

        <Section title="EDUCATION">
          <View style={styles.eduRow}>
            <Text style={styles.eduDegree}>{cvEducation.degree}</Text>
            <Text style={styles.jobPeriod}>{cvEducation.period}</Text>
          </View>
          <Text style={styles.eduInstitution}>{cvEducation.institution}</Text>
          <Text style={styles.entryBody}>{cvEducation.coursework}</Text>
        </Section>

        <Section title="CERTIFICATIONS">
          {cvCertifications.map((cert) => (
            <Bullet key={cert}>{cert}</Bullet>
          ))}
        </Section>

        <Section title="ACHIEVEMENTS">
          {cvAchievements.map((item) => (
            <Bullet key={item}>{item}</Bullet>
          ))}
        </Section>

        <Section title="LANGUAGES">
          <Text>{cvLanguages}</Text>
        </Section>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${cvHeader.name}  -  Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}
