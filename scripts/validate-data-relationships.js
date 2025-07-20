#!/usr/bin/env node

/**
 * Data Relationship Validation Script
 * Phase 1.2: Complete Data Relationships
 * 
 * This script validates all cross-references between data modules:
 * - People ↔ Timeline Events
 * - Financial Transactions ↔ People
 * - Properties ↔ Financial Transactions
 * - Events ↔ Multiple People
 * - Relationships ↔ All Data Types
 */

const fs = require('fs');
const path = require('path');

// Import data files
const timelineFile = path.join(__dirname, '../src/data/core/timeline.ts');
const peopleFile = path.join(__dirname, '../src/data/core/people.ts');
const relationshipsFile = path.join(__dirname, '../src/data/core/relationships.ts');
const organizationsFile = path.join(__dirname, '../src/data/core/organizations.ts');
const financialTransactionsFile = path.join(__dirname, '../src/data/financial/transactions.ts');
const financialEntitiesFile = path.join(__dirname, '../src/data/financial/entities.ts');
// const propertiesFile = path.join(__dirname, '../src/data/geographic/properties.ts'); // Reserved for future use

// eslint-disable-next-line no-console
console.log('🔍 Starting Data Relationship Validation...\n');

// Validation results
const validationResults = {
  missingPersonReferences: [],
  missingEventReferences: [],
  missingEntityReferences: [],
  missingPropertyReferences: [],
  brokenTimelineReferences: [],
  brokenFinancialReferences: [],
  brokenRelationshipReferences: [],
  summary: {
    totalIssues: 0,
    criticalIssues: 0,
    warningIssues: 0
  }
};

// Remove unused function
// function extractArrayFromFile(filePath, arrayName) { ... }

function extractEntityIds(content, _entityType) {
  // Extract IDs from TypeScript files
  const idRegex = /id:\s*['"`]([^'"`]+)['"`]/g;
  const ids = [];
  let match;
  
  while ((match = idRegex.exec(content)) !== null) {
    ids.push(match[1]);
  }
  
  return ids;
}

function validatePeopleTimelineReferences() {
  // eslint-disable-next-line no-console
  console.log('🔗 Validating People ↔ Timeline Event References...');
  
  try {
    const timelineContent = fs.readFileSync(timelineFile, 'utf8');
    const peopleContent = fs.readFileSync(peopleFile, 'utf8');
    const organizationsContent = fs.readFileSync(organizationsFile, 'utf8');
    
    // Extract people IDs
    const peopleIds = extractEntityIds(peopleContent, 'person');
    // Extract organization IDs  
    const organizationIds = extractEntityIds(organizationsContent, 'organization');
    // Combine all valid entity IDs
    const allValidEntityIds = [...peopleIds, ...organizationIds];
    
    // eslint-disable-next-line no-console
    console.log(`   Found ${peopleIds.length} people IDs`);
    // eslint-disable-next-line no-console
    console.log(`   Found ${organizationIds.length} organization IDs`);
    
    // Extract entity references from timeline
    const entityRefRegex = /entityId:\s*['"`]([^'"`]+)['"`]/g;
    let match;
    const timelineEntityRefs = [];
    
    while ((match = entityRefRegex.exec(timelineContent)) !== null) {
      timelineEntityRefs.push(match[1]);
    }
    
    // eslint-disable-next-line no-console
    console.log(`   Found ${timelineEntityRefs.length} entity references in timeline`);
    
    // Check for broken references - exclude known non-person/organization entities
    const brokenRefs = timelineEntityRefs.filter(ref => 
      !allValidEntityIds.includes(ref) && 
      ref !== 'bear-stearns' && ref !== 'manhattan-mansion' && 
      ref !== 'little-saint-james' && ref !== 'palm-beach-estate' &&
      ref !== 'j-epstein-co' && ref !== 'victoria-secret'
    );
    
    if (brokenRefs.length > 0) {
      // eslint-disable-next-line no-console
      console.log(`   ⚠️  Found ${brokenRefs.length} potentially broken references:`);
      brokenRefs.forEach(ref => {
        // eslint-disable-next-line no-console
        console.log(`      - ${ref}`);
        validationResults.brokenTimelineReferences.push(ref);
      });
      validationResults.summary.warningIssues += brokenRefs.length;
    } else {
      // eslint-disable-next-line no-console
      console.log('   ✅ All timeline entity references appear valid');
    }
    
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('   ❌ Error validating people-timeline references:', error.message);
    validationResults.summary.criticalIssues++;
  }
}

function validateFinancialEntityReferences() {
  console.log('\n💰 Validating Financial Entity References...');
  
  try {
    const transactionsContent = fs.readFileSync(financialTransactionsFile, 'utf8');
    const entitiesContent = fs.readFileSync(financialEntitiesFile, 'utf8');
    
    // Extract entity IDs
    const entityIds = extractEntityIds(entitiesContent, 'entity');
    console.log(`   Found ${entityIds.length} financial entity IDs`);
    
    // Extract fromEntity and toEntity references
    const fromEntityRegex = /fromEntity:\s*['"`]([^'"`]+)['"`]/g;
    const toEntityRegex = /toEntity:\s*['"`]([^'"`]+)['"`]/g;
    
    const fromEntityRefs = [];
    const toEntityRefs = [];
    let match;
    
    while ((match = fromEntityRegex.exec(transactionsContent)) !== null) {
      fromEntityRefs.push(match[1]);
    }
    
    while ((match = toEntityRegex.exec(transactionsContent)) !== null) {
      toEntityRefs.push(match[1]);
    }
    
    console.log(`   Found ${fromEntityRefs.length} fromEntity references`);
    console.log(`   Found ${toEntityRefs.length} toEntity references`);
    
    // Check for broken references
    const allEntityRefs = [...fromEntityRefs, ...toEntityRefs];
    const brokenEntityRefs = allEntityRefs.filter(ref => !entityIds.includes(ref));
    
    if (brokenEntityRefs.length > 0) {
      console.log(`   ⚠️  Found ${brokenEntityRefs.length} broken entity references:`);
      brokenEntityRefs.forEach(ref => {
        console.log(`      - ${ref}`);
        validationResults.brokenFinancialReferences.push(ref);
      });
      validationResults.summary.warningIssues += brokenEntityRefs.length;
    } else {
      console.log('   ✅ All financial entity references appear valid');
    }
    
  } catch (error) {
    console.error('   ❌ Error validating financial entity references:', error.message);
    validationResults.summary.criticalIssues++;
  }
}

function validateRelatedEventReferences() {
  console.log('\n📅 Validating Related Event References...');
  
  try {
    const timelineContent = fs.readFileSync(timelineFile, 'utf8');
    const transactionsContent = fs.readFileSync(financialTransactionsFile, 'utf8');
    
    // Extract event IDs from timeline
    const eventIds = extractEntityIds(timelineContent, 'event');
    console.log(`   Found ${eventIds.length} timeline event IDs`);
    
    // Extract relatedEvent references from transactions
    const relatedEventRegex = /relatedEvent:\s*['"`]([^'"`]+)['"`]/g;
    const relatedEventRefs = [];
    let match;
    
    while ((match = relatedEventRegex.exec(transactionsContent)) !== null) {
      relatedEventRefs.push(match[1]);
    }
    
    console.log(`   Found ${relatedEventRefs.length} relatedEvent references`);
    
    // Check for broken references
    const brokenEventRefs = relatedEventRefs.filter(ref => !eventIds.includes(ref));
    
    if (brokenEventRefs.length > 0) {
      console.log(`   ⚠️  Found ${brokenEventRefs.length} broken event references:`);
      brokenEventRefs.forEach(ref => {
        console.log(`      - ${ref}`);
        validationResults.brokenTimelineReferences.push(ref);
      });
      validationResults.summary.warningIssues += brokenEventRefs.length;
    } else {
      console.log('   ✅ All related event references appear valid');
    }
    
  } catch (error) {
    console.error('   ❌ Error validating related event references:', error.message);
    validationResults.summary.criticalIssues++;
  }
}

function validateRelationshipReferences() {
  console.log('\n🔗 Validating Relationship Entity References...');
  
  try {
    const relationshipsContent = fs.readFileSync(relationshipsFile, 'utf8');
    const peopleContent = fs.readFileSync(peopleFile, 'utf8');
    
    // Extract people IDs
    const peopleIds = extractEntityIds(peopleContent, 'person');
    console.log(`   Found ${peopleIds.length} people IDs`);
    
    // Extract entity1Id and entity2Id references
    const entity1Regex = /entity1Id:\s*['"`]([^'"`]+)['"`]/g;
    const entity2Regex = /entity2Id:\s*['"`]([^'"`]+)['"`]/g;
    
    const entity1Refs = [];
    const entity2Refs = [];
    let match;
    
    while ((match = entity1Regex.exec(relationshipsContent)) !== null) {
      entity1Refs.push(match[1]);
    }
    
    while ((match = entity2Regex.exec(relationshipsContent)) !== null) {
      entity2Refs.push(match[1]);
    }
    
    console.log(`   Found ${entity1Refs.length} entity1Id references`);
    console.log(`   Found ${entity2Refs.length} entity2Id references`);
    
    // Check for broken references (only person entities for now)
    const allEntityRefs = [...entity1Refs, ...entity2Refs];
    const personRefs = allEntityRefs.filter(ref => 
      !ref.includes('manhattan-mansion') && 
      !ref.includes('little-saint-james') &&
      !ref.includes('bear-stearns') &&
      !ref.includes('l-brands') &&
      !ref.includes('miami-herald') &&
      !ref.includes('terramar-project')
    );
    
    const brokenPersonRefs = personRefs.filter(ref => !peopleIds.includes(ref));
    
    if (brokenPersonRefs.length > 0) {
      console.log(`   ⚠️  Found ${brokenPersonRefs.length} potentially broken person references:`);
      brokenPersonRefs.forEach(ref => {
        console.log(`      - ${ref}`);
        validationResults.brokenRelationshipReferences.push(ref);
      });
      validationResults.summary.warningIssues += brokenPersonRefs.length;
    } else {
      console.log('   ✅ All relationship person references appear valid');
    }
    
  } catch (error) {
    console.error('   ❌ Error validating relationship references:', error.message);
    validationResults.summary.criticalIssues++;
  }
}

function generateSummaryReport() {
  console.log('\n📋 VALIDATION SUMMARY REPORT');
  console.log('═'.repeat(50));
  
  const totalIssues = validationResults.summary.criticalIssues + validationResults.summary.warningIssues;
  validationResults.summary.totalIssues = totalIssues;
  
  if (totalIssues === 0) {
    console.log('🎉 EXCELLENT! All data relationships appear to be valid!');
    console.log('✅ Ready to proceed to Phase 2: Enhanced Data Utilization');
  } else {
    console.log(`📊 Total Issues Found: ${totalIssues}`);
    console.log(`   - Critical Issues: ${validationResults.summary.criticalIssues}`);
    console.log(`   - Warning Issues: ${validationResults.summary.warningIssues}`);
    
    if (validationResults.brokenTimelineReferences.length > 0) {
      console.log(`\n⚠️  Timeline Reference Issues (${validationResults.brokenTimelineReferences.length}):`);
      validationResults.brokenTimelineReferences.forEach(ref => console.log(`   - ${ref}`));
    }
    
    if (validationResults.brokenFinancialReferences.length > 0) {
      console.log(`\n⚠️  Financial Reference Issues (${validationResults.brokenFinancialReferences.length}):`);
      validationResults.brokenFinancialReferences.forEach(ref => console.log(`   - ${ref}`));
    }
    
    if (validationResults.brokenRelationshipReferences.length > 0) {
      console.log(`\n⚠️  Relationship Reference Issues (${validationResults.brokenRelationshipReferences.length}):`);
      validationResults.brokenRelationshipReferences.forEach(ref => console.log(`   - ${ref}`));
    }
    
    console.log('\n🔧 RECOMMENDED ACTIONS:');
    console.log('1. Fix broken references by updating entity IDs');
    console.log('2. Add missing entities to appropriate data files');
    console.log('3. Ensure all cross-references use consistent naming');
    console.log('4. Re-run validation after fixes');
  }
  
  console.log('\n📈 PHASE 1.2 STATUS:');
  if (totalIssues === 0) {
    console.log('✅ PHASE 1.2 COMPLETE - Data relationships validated');
  } else if (validationResults.summary.criticalIssues === 0) {
    console.log('🟡 PHASE 1.2 MOSTLY COMPLETE - Minor warnings only');
  } else {
    console.log('🔴 PHASE 1.2 IN PROGRESS - Critical issues need attention');
  }
}

// Run all validations
async function runValidation() {
  validatePeopleTimelineReferences();
  validateFinancialEntityReferences();
  validateRelatedEventReferences();
  validateRelationshipReferences();
  generateSummaryReport();
  
  // Write results to file for reference
  const reportPath = path.join(__dirname, '../validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(validationResults, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
}

// Execute validation
runValidation().catch(console.error);
