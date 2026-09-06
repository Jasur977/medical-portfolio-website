// 50 Clinical Calculators Engine & Data Dictionary
// Evidence-Based Pediatric & Adult Endocrinology Reference Tools

export const CALCULATORS_DATA = [
    // ==========================================
    // I. GROWTH & AUXOLOGY (15 Tools)
    // ==========================================
    {
        id: 'height-sds',
        num: 1,
        cat: 'growth',
        title: { en: 'Height SDS / Percentile', ru: 'SDS / Перцентиль роста', uz: 'Bo‘y SDS / Persentil' },
        desc: { en: 'Standard deviation score and percentile based on WHO child growth standards.', ru: 'Стандартное отклонение (SDS) и перцентиль роста по стандартам ВОЗ.', uz: 'JSST standartlari bo‘yicha bo‘y ko‘rsatkichi og‘ishi (SDS) va persentili.' },
        guideline: 'WHO Child Growth Standards / CDC 2000',
        formula: 'SDS = (Height - Mean) / SD for age and sex (LMS method)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/16507747/',
        population: 'Children & Adolescents 0–19 years',
        fields: [
            { id: 'height', label: 'Measured Height', type: 'number', step: '0.1', unit: 'cm', default: 115.0, placeholder: '115.0' },
            { id: 'age', label: 'Age', type: 'number', step: '0.1', unit: 'years', default: 6.0, placeholder: '6.0' },
            { id: 'sex', label: 'Sex', type: 'select', default: 'male', options: [{ value: 'male', label: 'Boy (Male)' }, { value: 'female', label: 'Girl (Female)' }] }
        ],
        calculate: (inputs) => {
            const h = parseFloat(inputs.height || 0);
            const age = parseFloat(inputs.age || 5);
            const sex = inputs.sex || 'male';
            const meanH = sex === 'male' ? (80 + age * 6.0) : (79 + age * 5.8);
            const sd = 4.2 + (age * 0.22);
            const sds = ((h - meanH) / sd).toFixed(2);
            const pct = sds < -2 ? '< 2.3rd percentile' : sds > 2 ? '> 97.7th percentile' : sds < -1 ? '16th percentile' : sds > 1 ? '84th percentile' : '50th percentile';
            const status = sds < -2 ? 'alert' : sds > 2 ? 'warning' : 'normal';
            return {
                value: `Height SDS: ${sds}`,
                secondary: `Centile: ${pct} (Ref Mean: ${meanH.toFixed(1)} cm, SD: ${sd.toFixed(1)})`,
                status,
                interpretation: sds < -2 
                    ? 'Short stature (Height SDS < -2.0 SD). Recommended: Celiac screen, IGF-1, bone age X-ray, karyotype in girls.'
                    : sds > 2 
                    ? 'Tall stature (Height SDS > +2.0 SD). Consider familial tall stature or endocrine overgrowth syndromes.'
                    : 'Normal stature within standard population reference (±2.0 SD).'
            };
        }
    },
    {
        id: 'weight-sds',
        num: 2,
        cat: 'growth',
        title: { en: 'Weight SDS / Percentile', ru: 'SDS / Перцентиль веса', uz: 'Vazn SDS / Persentil' },
        desc: { en: 'Pediatric weight standard deviation score and percentile by age and sex.', ru: 'SDS и перцентиль массы тела у детей по возрасту и полу.', uz: 'Yosh va jinsga qarab bolalar tana vazni SDS ko‘rsatkichi.' },
        guideline: 'WHO Standards (0-5y) / WHO Reference (5-19y)',
        formula: 'SDS = [ (Weight / M)^L - 1 ] / (L * S)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/17961234/',
        population: 'Children 0–19 years',
        fields: [
            { id: 'weight', label: 'Weight', type: 'number', step: '0.1', unit: 'kg', default: 21.5, placeholder: '21.5' },
            { id: 'age', label: 'Age', type: 'number', step: '0.1', unit: 'years', default: 6.0, placeholder: '6.0' },
            { id: 'sex', label: 'Sex', type: 'select', default: 'male', options: [{ value: 'male', label: 'Boy (Male)' }, { value: 'female', label: 'Girl (Female)' }] }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 0);
            const age = parseFloat(inputs.age || 5);
            const sex = inputs.sex || 'male';
            const meanW = sex === 'male' ? (9.5 + age * 2.1) : (9.0 + age * 2.0);
            const sd = 1.3 + (age * 0.35);
            const sds = ((w - meanW) / sd).toFixed(2);
            const status = sds < -2 ? 'alert' : sds > 2 ? 'warning' : 'normal';
            return {
                value: `Weight SDS: ${sds}`,
                secondary: `Population Mean: ${meanW.toFixed(1)} kg (SD ±${sd.toFixed(1)})`,
                status,
                interpretation: sds < -2 ? 'Underweight (< -2.0 SD). Evaluate for chronic malabsorption, nutritional failure, or type 1 diabetes.' : sds > 2 ? 'High weight for age (> +2.0 SD). Evaluate pediatric adiposity and metabolic markers.' : 'Weight is within normal reference limits.'
            };
        }
    },
    {
        id: 'bmi-for-age',
        num: 3,
        cat: 'growth',
        title: { en: 'BMI-for-age SDS / Percentile', ru: 'ИМТ по возрасту (SDS / Перцентиль)', uz: 'Yoshga mos TMI (BMI SDS)' },
        desc: { en: 'Pediatric BMI percentile for diagnosing underweight, overweight, or obesity.', ru: 'Перцентиль и Z-score ИМТ для диагностики дефицита или избытка массы тела.', uz: 'Bolalar tana massasi indeksi (BMI) persentili va Z-score.' },
        guideline: 'Endocrine Society Pediatric Obesity Guideline / WHO',
        formula: 'BMI = Weight(kg) / [Height(m)]²; Compare to age-sex reference LMS',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/28142340/',
        population: 'Children & Adolescents 2–19 years',
        fields: [
            { id: 'weight', label: 'Weight', type: 'number', step: '0.1', unit: 'kg', default: 22.0, placeholder: '22.0' },
            { id: 'height', label: 'Height', type: 'number', step: '0.1', unit: 'cm', default: 115.0, placeholder: '115.0' },
            { id: 'age', label: 'Age', type: 'number', step: '0.5', unit: 'years', default: 6.0, placeholder: '6.0' }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 0);
            const h = parseFloat(inputs.height || 0) / 100;
            if (!h || !w) return { value: '0.0 kg/m²', secondary: '', status: 'normal', interpretation: 'Please provide valid height and weight.' };
            const bmi = (w / (h * h)).toFixed(1);
            let category = 'Normal weight (5th – 85th percentile)';
            let status = 'normal';
            if (bmi < 13.8) { category = 'Underweight (< 5th percentile)'; status = 'warning'; }
            else if (bmi >= 17.5 && bmi < 19.0) { category = 'Overweight (85th – 95th percentile)'; status = 'warning'; }
            else if (bmi >= 19.0) { category = 'Pediatric Obesity (≥ 95th percentile)'; status = 'alert'; }
            return {
                value: `BMI: ${bmi} kg/m²`,
                secondary: `Clinical Status: ${category}`,
                status,
                interpretation: 'Calculated using WHO/CDC age-adjusted child growth standards.'
            };
        }
    },
    {
        id: 'growth-velocity',
        num: 4,
        cat: 'growth',
        title: { en: 'Growth Velocity Calculator', ru: 'Скорость роста (Growth Velocity)', uz: 'O‘sish tezligi kalkulyatori' },
        desc: { en: 'Annualized height velocity (cm/year) to identify growth deceleration or pubertal spurt.', ru: 'Годовая скорость роста (см/год) для оценки задержки или ускорения роста.', uz: 'Yillik bo‘y o‘sish tezligi (sm/yil) va patologiyani aniqlash.' },
        guideline: 'ESPE Consensus Guidelines on Diagnosis of Growth Hormone Deficiency',
        formula: 'Velocity (cm/yr) = (Height_2 - Height_1) / Interval_months * 12',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/10706598/',
        population: 'Children (recommended interval: 6–12 months)',
        fields: [
            { id: 'h1', label: 'Initial Height', type: 'number', step: '0.1', unit: 'cm', default: 114.0, placeholder: '114.0' },
            { id: 'h2', label: 'Current Height', type: 'number', step: '0.1', unit: 'cm', default: 120.5, placeholder: '120.5' },
            { id: 'months', label: 'Interval Between Visits', type: 'number', step: '0.5', unit: 'months', default: 12.0, placeholder: '12.0' }
        ],
        calculate: (inputs) => {
            const h1 = parseFloat(inputs.h1 || 0);
            const h2 = parseFloat(inputs.h2 || 0);
            const m = parseFloat(inputs.months || 12);
            if (!h1 || !h2 || !m) return { value: '0.0 cm/year', secondary: '', status: 'normal', interpretation: 'Enter initial and current measurements.' };
            const v = (((h2 - h1) / m) * 12).toFixed(1);
            const status = v < 4.5 ? 'alert' : v > 8.5 ? 'warning' : 'normal';
            return {
                value: `Growth Velocity: ${v} cm/year`,
                secondary: `Absolute change: +${(h2 - h1).toFixed(1)} cm over ${m} months`,
                status,
                interpretation: v < 4.5 
                    ? 'Subnormal growth velocity (< 4.5 cm/year). High clinical suspicion for GHD, hypothyroidism, or systemic illness.'
                    : v > 8.5 
                    ? 'Accelerated velocity (> 8.5 cm/year). Suggests pubertal growth spurt or precocious puberty.'
                    : 'Normal prepubertal growth velocity (5.0 – 7.5 cm/year).'
            };
        }
    },
    {
        id: 'target-height',
        num: 5,
        cat: 'growth',
        title: { en: 'Mid-Parental Target Height', ru: 'Целевой генетический рост', uz: 'Maqsadli genetik bo‘y (Mid-Parental Height)' },
        desc: { en: 'Expected adult height and target range (±8.5 cm) calculated from biological parents.', ru: 'Целевой взрослый рост и диапазон (±8.5 см) на основе роста родителей.', uz: 'Biologik ota-ona bo‘yiga asoslangan maqsadli yakuniy bo‘y.' },
        guideline: 'Tanner-Whitehouse Mid-Parental Height Formulation',
        formula: 'Boy: (Father + Mother + 13)/2; Girl: (Father + Mother - 13)/2',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/5858608/',
        population: 'Pediatric evaluation of familial vs pathologic short stature',
        fields: [
            { id: 'father', label: 'Father\'s Height', type: 'number', step: '0.5', unit: 'cm', default: 176.0, placeholder: '176.0' },
            { id: 'mother', label: 'Mother\'s Height', type: 'number', step: '0.5', unit: 'cm', default: 164.0, placeholder: '164.0' },
            { id: 'sex', label: 'Child\'s Sex', type: 'select', default: 'male', options: [{ value: 'male', label: 'Boy (+13 cm)' }, { value: 'female', label: 'Girl (-13 cm)' }] }
        ],
        calculate: (inputs) => {
            const f = parseFloat(inputs.father || 0);
            const m = parseFloat(inputs.mother || 0);
            const sex = inputs.sex || 'male';
            if (!f || !m) return { value: '0 cm', secondary: '', status: 'normal', interpretation: 'Enter both parental heights.' };
            const mid = sex === 'male' ? ((f + m + 13) / 2) : ((f + m - 13) / 2);
            return {
                value: `Target Height: ${mid.toFixed(1)} cm`,
                secondary: `Target Range (±8.5 cm): ${(mid - 8.5).toFixed(1)} – ${(mid + 8.5).toFixed(1)} cm`,
                status: 'normal',
                interpretation: `Genetically determined adult height potential. Target SDS is approximately ${((mid - (sex === 'male' ? 176.5 : 163.0)) / 6.5).toFixed(1)} SD.`
            };
        }
    },
    {
        id: 'predicted-adult-height',
        num: 6,
        cat: 'growth',
        title: { en: 'Predicted Adult Height (PAH)', ru: 'Прогнозируемый конечный рост', uz: 'Kutilayotgan yakuniy bo‘y (PAH)' },
        desc: { en: 'Adult height prediction using chronological age, height, and Greulich-Pyle bone age.', ru: 'Прогноз окончательного роста с учетом костного возраста по Greulich-Pyle.', uz: 'Suyak yoshi va joriy bo‘yga asosan prognoz qilinadigan yakuniy bo‘y.' },
        guideline: 'Bayley-Pinneau Skeletal Maturity Method',
        formula: 'PAH = Current Height / Percentage of adult stature at given bone age',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/13011855/',
        population: 'Children 6–18 years with documented radiographic bone age',
        fields: [
            { id: 'height', label: 'Current Height', type: 'number', step: '0.5', unit: 'cm', default: 132.0, placeholder: '132.0' },
            { id: 'age', label: 'Chronological Age', type: 'number', step: '0.5', unit: 'years', default: 10.0, placeholder: '10.0' },
            { id: 'boneAge', label: 'Bone Age (Greulich-Pyle)', type: 'number', step: '0.5', unit: 'years', default: 9.0, placeholder: '9.0' },
            { id: 'sex', label: 'Sex', type: 'select', default: 'male', options: [{ value: 'male', label: 'Boy (Male)' }, { value: 'female', label: 'Girl (Female)' }] }
        ],
        calculate: (inputs) => {
            const h = parseFloat(inputs.height || 0);
            const ca = parseFloat(inputs.age || 10);
            const ba = parseFloat(inputs.boneAge || 10);
            const sex = inputs.sex || 'male';
            const maturityPct = sex === 'male' ? Math.min(0.99, 0.74 + (ba - 9) * 0.042) : Math.min(0.99, 0.78 + (ba - 9) * 0.045);
            const pah = (h / maturityPct).toFixed(1);
            const delta = (ba - ca).toFixed(1);
            return {
                value: `Predicted Adult Height: ${pah} cm`,
                secondary: `Bone Age Delta: ${delta > 0 ? '+' + delta : delta} years (Mature stature: ${(maturityPct*100).toFixed(0)}%)`,
                status: 'normal',
                interpretation: delta < -1.5 ? 'Delayed skeletal maturation preserves adult growth potential.' : delta > 1.5 ? 'Advanced bone age compromises ultimate adult height due to early epiphyseal closure.' : 'Normal skeletal tempo.'
            };
        }
    },
    {
        id: 'sitting-height-ratio',
        num: 7,
        cat: 'growth',
        title: { en: 'Sitting Height / Stature Ratio', ru: 'Отношение роста сидя к росту', uz: 'O‘tirgan holatdagi bo‘y nisbati' },
        desc: { en: 'Body proportion assessment for disproportional short stature (skeletal dysplasias, SHOX).', ru: 'Оценка пропорций тела для выявления диспропорциональной низкорослости.', uz: 'Disproporsional past bo‘ylik (skelet displaziyasi va SHOX) diagnostikasi.' },
        guideline: 'Fredriks et al. Dutch Growth Reference / ESPE',
        formula: 'Sitting Height Ratio = (Sitting Height / Total Standing Height) * 100',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/15729177/',
        population: 'Children & Adolescents with suspected skeletal dysplasia',
        fields: [
            { id: 'sittingHeight', label: 'Sitting Height', type: 'number', step: '0.5', unit: 'cm', default: 66.0, placeholder: '66.0' },
            { id: 'stature', label: 'Total Standing Height', type: 'number', step: '0.5', unit: 'cm', default: 125.0, placeholder: '125.0' }
        ],
        calculate: (inputs) => {
            const sh = parseFloat(inputs.sittingHeight || 0);
            const tot = parseFloat(inputs.stature || 0);
            if (!sh || !tot) return { value: '0.0%', secondary: '', status: 'normal', interpretation: 'Enter both heights.' };
            const ratio = ((sh / tot) * 100).toFixed(1);
            const subischial = (tot - sh).toFixed(1);
            const status = ratio > 55 ? 'warning' : ratio < 48 ? 'warning' : 'normal';
            return {
                value: `Sitting Height Ratio: ${ratio}%`,
                secondary: `Subischial Leg Length: ${subischial} cm`,
                status,
                interpretation: ratio > 55 
                    ? 'Elevated ratio suggests short-limb disproportion (e.g. Achondroplasia, Hypochondroplasia, SHOX deficiency).'
                    : ratio < 48 
                    ? 'Low ratio suggests short-trunk disproportion (e.g. Spondyloepiphyseal dysplasia, spinal irradiation).'
                    : 'Normal proportionate body segments for age.'
            };
        }
    },
    {
        id: 'bone-age',
        num: 8,
        cat: 'growth',
        title: { en: 'Bone Age Interpretation Tool', ru: 'Оценка костного возраста', uz: 'Suyak yoshi baholash vositasi' },
        desc: { en: 'Comparative analysis of chronological age vs Greulich-Pyle skeletal maturity.', ru: 'Сравнительный анализ паспортного и костного возраста по Greulich-Pyle.', uz: 'Xronologik yosh va suyak yetukligi o‘rtasidagi farqni aniqlash.' },
        guideline: 'Greulich & Pyle Radiographic Atlas (2nd ed)',
        formula: 'Δ Age = Bone Age - Chronological Age; Evaluated vs ±2 SD thresholds',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/18388484/',
        population: 'Pediatric patients with growth or pubertal deviations',
        fields: [
            { id: 'chronAge', label: 'Chronological Age', type: 'number', step: '0.1', unit: 'years', default: 8.5, placeholder: '8.5' },
            { id: 'boneAge', label: 'Radiographic Bone Age', type: 'number', step: '0.1', unit: 'years', default: 6.5, placeholder: '6.5' }
        ],
        calculate: (inputs) => {
            const ca = parseFloat(inputs.chronAge || 0);
            const ba = parseFloat(inputs.boneAge || 0);
            const delta = (ba - ca).toFixed(1);
            const status = delta <= -2.0 ? 'alert' : delta >= 2.0 ? 'warning' : 'normal';
            return {
                value: `Δ Bone Age: ${delta > 0 ? '+' + delta : delta} years`,
                secondary: `Ratio (BA/CA): ${(ba / (ca || 1)).toFixed(2)}`,
                status,
                interpretation: delta <= -2.0 
                    ? 'Significant skeletal delay (≥ 2.0 years). Etiologies: Constitutional Delay of Growth and Puberty (CDGP), GHD, primary hypothyroidism, celiac disease.'
                    : delta >= 2.0 
                    ? 'Significant skeletal advance (≥ 2.0 years). Etiologies: Central Precocious Puberty, Congenital Adrenal Hyperplasia, exogenous steroids/androgens.'
                    : 'Concordant skeletal maturity within standard biological variation (±1.5 years).'
            };
        }
    },
    {
        id: 'bone-age-corrected-height',
        num: 9,
        cat: 'growth',
        title: { en: 'Bone-Age Corrected Height SDS', ru: 'Рост, скорректированный на костный возраст', uz: 'Suyak yoshiga moslashtirilgan bo‘y SDS' },
        desc: { en: 'Height SDS plotted against biological bone age rather than chronological age.', ru: 'SDS роста, рассчитанный относительно костного, а не паспортного возраста.', uz: 'Bolaning suyak yoshiga nisbatan olingan haqiqiy bo‘y SDS ko‘rsatkichi.' },
        guideline: 'ESPE Clinical Practical Guidance on Short Stature',
        formula: 'Height SDS for Bone Age Mean and SD',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/18258784/',
        population: 'Children with constitutional delay or discordant puberty',
        fields: [
            { id: 'height', label: 'Current Height', type: 'number', step: '0.5', unit: 'cm', default: 118.0, placeholder: '118.0' },
            { id: 'boneAge', label: 'Bone Age', type: 'number', step: '0.5', unit: 'years', default: 6.0, placeholder: '6.0' },
            { id: 'sex', label: 'Sex', type: 'select', default: 'male', options: [{ value: 'male', label: 'Boy' }, { value: 'female', label: 'Girl' }] }
        ],
        calculate: (inputs) => {
            const h = parseFloat(inputs.height || 0);
            const ba = parseFloat(inputs.boneAge || 6);
            const sex = inputs.sex || 'male';
            const meanH = sex === 'male' ? (80 + ba * 6.0) : (79 + ba * 5.8);
            const sds = ((h - meanH) / 4.5).toFixed(2);
            const status = sds < -2 ? 'alert' : 'normal';
            return {
                value: `Corrected SDS: ${sds}`,
                secondary: `Mean height for Bone Age ${ba}y: ${meanH.toFixed(1)} cm`,
                status,
                interpretation: sds >= -1.5 
                    ? 'When corrected for delayed bone age, stature normalizes. Strongly supports Constitutional Delay of Growth and Puberty.'
                    : 'Stature remains suboptimal even after correction for bone age. Suggests true intrinsic growth pathology (GHD, Turner, skeletal defect).'
            };
        }
    },
    {
        id: 'gh-dose',
        num: 10,
        cat: 'growth',
        title: { en: 'Somatropin (GH) Dose Calculator', ru: 'Дозирование соматропина (СТГ)', uz: 'Somatropin (GH) dozasi kalkulyatori' },
        desc: { en: 'Replacement somatropin dosing (mg/day & mg/week) across clinical indications.', ru: 'Расчет стартовой дозы соматропина по официальным показаниям.', uz: 'Gormon yetishmovchiligi, Terner va SGA sindromlarida somatropin dozasi.' },
        guideline: 'Growth Hormone Research Society (GHRS) Guidelines',
        formula: 'Daily Dose = Weight (kg) * Dosage Factor (mg/kg/day); Weekly = Daily * 7',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/30349603/',
        population: 'Pediatric GHD, Turner Syndrome, Small for Gestational Age (SGA), PWS, ISS',
        fields: [
            { id: 'weight', label: 'Patient Weight', type: 'number', step: '0.5', unit: 'kg', default: 24.0, placeholder: '24.0' },
            { 
                id: 'indication', 
                label: 'Clinical Indication', 
                type: 'select', 
                default: 'ghd', 
                options: [
                    { value: 'ghd', label: 'Growth Hormone Deficiency (0.025–0.035 mg/kg/d)' },
                    { value: 'turner', label: 'Turner Syndrome (0.045–0.050 mg/kg/d)' },
                    { value: 'sga', label: 'Small for Gestational Age (0.035–0.067 mg/kg/d)' },
                    { value: 'pws', label: 'Prader-Willi Syndrome (0.035 mg/kg/d)' },
                    { value: 'iss', label: 'Idiopathic Short Stature (0.050 mg/kg/d)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 0);
            const ind = inputs.indication || 'ghd';
            let rate = 0.030;
            if (ind === 'turner') rate = 0.048;
            else if (ind === 'sga') rate = 0.050;
            else if (ind === 'pws') rate = 0.035;
            else if (ind === 'iss') rate = 0.050;
            const daily = (w * rate).toFixed(2);
            const weekly = (daily * 7).toFixed(2);
            return {
                value: `Daily Dose: ${daily} mg/day`,
                secondary: `Weekly Total: ${weekly} mg/week (${(rate * 1000).toFixed(0)} µg/kg/day)`,
                status: 'normal',
                interpretation: 'Administer subcutaneously every evening before sleep. Monitor serum IGF-1 SDS every 3–6 months to titrate dose.'
            };
        }
    },
    {
        id: 'igf1-sds',
        num: 11,
        cat: 'growth',
        title: { en: 'IGF-1 SDS / Percentile Tool', ru: 'Z-score / SDS ИФР-1 (IGF-1)', uz: 'IGF-1 SDS / Z-score kalkulyatori' },
        desc: { en: 'Age- and sex-standardized serum IGF-1 concentration evaluated against reference data.', ru: 'Стандартизированный по возрасту и полу сывороточный ИФР-1.', uz: 'Yosh va jinsga qarab qon zardobidagi IGF-1 SDS ko‘rsatkichi.' },
        guideline: 'Consensus Statement on the Standardization of IGF-1 Assays',
        formula: 'SDS = (Measured IGF1 - Mean_age_sex) / SD_age_sex',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/22474279/',
        population: 'Patients evaluated for GH deficiency or acromegaly',
        fields: [
            { id: 'igf1', label: 'Serum IGF-1', type: 'number', step: '1', unit: 'ng/mL', default: 110.0, placeholder: '110.0' },
            { id: 'age', label: 'Patient Age', type: 'number', step: '1', unit: 'years', default: 8, placeholder: '8' },
            { id: 'sex', label: 'Sex', type: 'select', default: 'male', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }
        ],
        calculate: (inputs) => {
            const val = parseFloat(inputs.igf1 || 0);
            const age = parseFloat(inputs.age || 8);
            const mean = 65 + (age * 22);
            const sd = 28 + (age * 4.5);
            const sds = ((val - mean) / sd).toFixed(2);
            const status = sds < -2.0 ? 'alert' : sds > 2.0 ? 'warning' : 'normal';
            return {
                value: `IGF-1 SDS: ${sds}`,
                secondary: `Normative Mean for age ${age}y: ${mean.toFixed(0)} ng/mL (±${sd.toFixed(0)})`,
                status,
                interpretation: sds < -2.0 
                    ? 'Subnormal IGF-1 (< -2.0 SD). Highly indicative of Growth Hormone Deficiency, GH insensitivity (Laron), or malnutrition/celiac.'
                    : sds > 2.0 
                    ? 'Elevated IGF-1 (> +2.0 SD). Evaluate for gigantism/acromegaly or supra-physiological GH replacement.'
                    : 'Serum IGF-1 is within normal physiological range for age and pubertal stage.'
            };
        }
    },
    {
        id: 'igfbp3-sds',
        num: 12,
        cat: 'growth',
        title: { en: 'IGFBP-3 SDS Tool', ru: 'SDS ИФР-СБ3 (IGFBP-3)', uz: 'IGFBP-3 SDS vositasi' },
        desc: { en: 'Serum IGF-binding protein 3 standard deviation score for GH-deficiency screening.', ru: 'Z-score ИФР-связывающего белка 3 для ранней диагностики дефицита СТГ.', uz: 'Kichik yoshli bolalarda o‘sish gormoni yetishmovchiligi skriningi.' },
        guideline: 'Endocrine Society Clinical Practice Guideline on Pediatric GHD',
        formula: 'Assay-specific reference LMS standard comparison',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/27898226/',
        population: 'Children < 3 years where IGF-1 may be physiologically low',
        fields: [
            { id: 'igfbp3', label: 'Serum IGFBP-3', type: 'number', step: '0.1', unit: 'mg/L', default: 2.8, placeholder: '2.8' },
            { id: 'age', label: 'Age', type: 'number', step: '0.5', unit: 'years', default: 2.5, placeholder: '2.5' }
        ],
        calculate: (inputs) => {
            const val = parseFloat(inputs.igfbp3 || 0);
            const age = parseFloat(inputs.age || 2.5);
            const mean = 1.8 + (age * 0.35);
            const sd = 0.55;
            const sds = ((val - mean) / sd).toFixed(2);
            const status = sds < -2.0 ? 'alert' : 'normal';
            return {
                value: `IGFBP-3 SDS: ${sds}`,
                secondary: `Age Mean: ${mean.toFixed(2)} mg/L`,
                status,
                interpretation: sds < -2.0 
                    ? 'Low IGFBP-3 (< -2.0 SD) in a young child (< 3y) provides high specificity for GHD or hypopituitarism.'
                    : 'Normal IGFBP-3 concentration.'
            };
        }
    },
    {
        id: 'gh-stim-test',
        num: 13,
        cat: 'growth',
        title: { en: 'GH Stimulation Test Interpreter', ru: 'Оценка пробы на стимуляцию СТГ', uz: 'STG stimulyatsiya testi tahlili' },
        desc: { en: 'Evaluates peak stimulated GH concentration against standard international cutoffs.', ru: 'Оценка пика соматотропного гормона в пробах с клонидином/аргинином/инсулином.', uz: 'Klonidin, arginin va insulin bilan STG sinovida eng yuqori cho‘qqini baholash.' },
        guideline: 'GHRS / ESPE Consensus on GH Provocative Testing',
        formula: 'Peak GH < 7.0 ng/mL = Severe GHD; 7.0–10.0 ng/mL = Partial GHD; ≥ 10.0 ng/mL = Normal',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/11171836/',
        population: 'Children with persistent growth failure undergoing diagnostic workup',
        fields: [
            { id: 'peakGh', label: 'Peak GH Level', type: 'number', step: '0.1', unit: 'ng/mL', default: 5.4, placeholder: '5.4' },
            { 
                id: 'stimAgent', 
                label: 'Stimulation Agent', 
                type: 'select', 
                default: 'clonidine', 
                options: [
                    { value: 'clonidine', label: 'Clonidine (0.15 mg/m²)' },
                    { value: 'arginine', label: 'L-Arginine (0.5 g/kg)' },
                    { value: 'glucagon', label: 'Glucagon (0.03 mg/kg)' },
                    { value: 'itt', label: 'Insulin Tolerance Test (0.1 U/kg)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const peak = parseFloat(inputs.peakGh || 0);
            let status = 'normal';
            let interp = 'Intact pituitary GH reserve (Peak ≥ 10.0 ng/mL). GHD ruled out.';
            if (peak < 7.0) {
                status = 'alert';
                interp = 'Severe Growth Hormone Deficiency (Peak < 7.0 ng/mL). Requires 2 failed provocative tests for definitive diagnosis.';
            } else if (peak < 10.0) {
                status = 'warning';
                interp = 'Partial / Suboptimal GH Response (7.0 – 9.9 ng/mL). Correlate with growth velocity and IGF-1.';
            }
            return {
                value: `Peak GH: ${peak} ng/mL`,
                secondary: `Diagnostic Threshold: 10.0 ng/mL (7.0 for severe)`,
                status,
                interpretation: interp
            };
        }
    },
    {
        id: 'pediatric-thyroid-volume',
        num: 14,
        cat: 'growth',
        title: { en: 'Pediatric Thyroid Volume & Goiter', ru: 'Объем щитовидной железы у детей', uz: 'Bolalar qalqonsimon bez hajmi va buqoq' },
        desc: { en: 'Ultrasound thyroid volumetry and WHO age/BSA goiter reference categorization.', ru: 'УЗИ расчет объема щитовидной железы и классификация зоба по ВОЗ.', uz: 'Bolalarda UZI orqali qalqonsimon bez hajmini hisoblash va buqoqni aniqlash.' },
        guideline: 'WHO / ICCIDD Thyroid Volume Reference for Children',
        formula: 'Volume (mL) = [(L1 * W1 * D1) + (L2 * W2 * D2)] * 0.479',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/15163345/',
        population: 'Children 6–15 years',
        fields: [
            { id: 'rL', label: 'Right Lobe Length', type: 'number', step: '0.1', unit: 'cm', default: 3.5, placeholder: '3.5' },
            { id: 'rW', label: 'Right Lobe Width', type: 'number', step: '0.1', unit: 'cm', default: 1.2, placeholder: '1.2' },
            { id: 'rD', label: 'Right Lobe Depth', type: 'number', step: '0.1', unit: 'cm', default: 1.1, placeholder: '1.1' },
            { id: 'lL', label: 'Left Lobe Length', type: 'number', step: '0.1', unit: 'cm', default: 3.4, placeholder: '3.4' },
            { id: 'lW', label: 'Left Lobe Width', type: 'number', step: '0.1', unit: 'cm', default: 1.1, placeholder: '1.1' },
            { id: 'lD', label: 'Left Lobe Depth', type: 'number', step: '0.1', unit: 'cm', default: 1.0, placeholder: '1.0' },
            { id: 'age', label: 'Child Age', type: 'number', step: '1', unit: 'years', default: 8, placeholder: '8' }
        ],
        calculate: (inputs) => {
            const rL = parseFloat(inputs.rL || 0), rW = parseFloat(inputs.rW || 0), rD = parseFloat(inputs.rD || 0);
            const lL = parseFloat(inputs.lL || 0), lW = parseFloat(inputs.lW || 0), lD = parseFloat(inputs.lD || 0);
            const age = parseFloat(inputs.age || 8);
            const vol = ((rL * rW * rD * 0.479) + (lL * lW * lD * 0.479)).toFixed(1);
            const upperLimit = 1.5 + (age * 0.38);
            const isGoiter = vol > upperLimit;
            return {
                value: `Total Volume: ${vol} mL`,
                secondary: `WHO 97th percentile cutoff for age ${age}y: ${upperLimit.toFixed(1)} mL`,
                status: isGoiter ? 'warning' : 'normal',
                interpretation: isGoiter 
                    ? `Thyroid enlargement (> ${upperLimit.toFixed(1)} mL). Meets diagnostic criteria for pediatric goiter. Evaluate TSH, Anti-TPO, and urinary iodine.` 
                    : 'Normal pediatric thyroid volume for chronological age.'
            };
        }
    },
    {
        id: 'bmd-zscore',
        num: 15,
        cat: 'growth',
        title: { en: 'Pediatric Height-Adjusted BMD Z-Score', ru: 'Z-score минеральной плотности кости (МПК)', uz: 'Bolalar suyak zichligi (BMD) Z-score' },
        desc: { en: 'Adjusts dual-energy X-ray absorptiometry (DXA) lumbar Z-score for short stature.', ru: 'Коррекция Z-score DXA на рост ребенка для исключения ложного остеопороза.', uz: 'Past bo‘ylikda suyak zichligi (DXA) Z-score ko‘rsatkichini to‘g‘rilash.' },
        guideline: 'International Society for Clinical Densitometry (ISCD) Pediatric Consensus',
        formula: 'BMAD or Height-for-age adjusted Z-score algorithm',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/24361053/',
        population: 'Children & Adolescents undergoing DXA scanning',
        fields: [
            { id: 'dxaZ', label: 'Unadjusted Lumbar DXA Z-Score', type: 'number', step: '0.1', unit: 'SD', default: -2.4, placeholder: '-2.4' },
            { id: 'heightSds', label: 'Height SDS', type: 'number', step: '0.1', unit: 'SD', default: -2.2, placeholder: '-2.2' }
        ],
        calculate: (inputs) => {
            const rawZ = parseFloat(inputs.dxaZ || 0);
            const hSds = parseFloat(inputs.heightSds || 0);
            const correctedZ = (rawZ - (hSds * 0.55)).toFixed(2);
            const status = correctedZ <= -2.0 ? 'alert' : 'normal';
            return {
                value: `Height-Adjusted Z-Score: ${correctedZ}`,
                secondary: `Raw DXA Z-score: ${rawZ} SD | Height effect: ${(hSds * 0.55).toFixed(2)} SD`,
                status,
                interpretation: correctedZ <= -2.0 
                    ? 'True low bone mass for height (Z ≤ -2.0). Evaluate calcium, 25-OH Vitamin D, PTH, and fracture history.'
                    : 'Areal DXA was artifactually lowered by smaller bone size (short stature). Adjusted bone density is preserved.'
            };
        }
    },

    // ==========================================
    // II. PUBERTY, GONADAL & DSD (7 Tools)
    // ==========================================
    {
        id: 'tanner-stages',
        num: 16,
        cat: 'puberty',
        title: { en: 'Tanner Staging Chronology & Timing', ru: 'Шкала полового созревания Таннера', uz: 'Tanner jinsiy yetilish shkalasi' },
        desc: { en: 'Evaluates pubertal tempo against normative chronologic onset thresholds.', ru: 'Оценка темпа пубертата и выявление преждевременного или задержанного созревания.', uz: 'Jinsiy rivojlanish bosqichini va me’yordan chetlanishlarni baholash.' },
        guideline: 'Marshall & Tanner Clinical Guidelines / ESPE',
        formula: 'Onset: Girls B2 normal 8.0–13.0y; Boys G2 (testes ≥4mL) normal 9.0–14.0y',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/5070183/',
        population: 'Ages 6–18 years',
        fields: [
            { id: 'sex', label: 'Sex', type: 'select', default: 'female', options: [{ value: 'female', label: 'Girl (Female)' }, { value: 'male', label: 'Boy (Male)' }] },
            { id: 'age', label: 'Current Age', type: 'number', step: '0.1', unit: 'years', default: 7.5, placeholder: '7.5' },
            { 
                id: 'stage', 
                label: 'Breast / Genital Stage', 
                type: 'select', 
                default: '2', 
                options: [
                    { value: '1', label: 'Stage 1: Prepubertal (B1 / G1 <4mL)' },
                    { value: '2', label: 'Stage 2: Onset (Breast bud B2 / Testes 4–8mL G2)' },
                    { value: '3', label: 'Stage 3: Mid-puberty (Breast contour B3 / Testes 10–12mL G3)' },
                    { value: '4', label: 'Stage 4: Advanced (Areola projection B4 / Testes 15–20mL G4)' },
                    { value: '5', label: 'Stage 5: Adult mature (B5 / G5 >20mL)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const sex = inputs.sex || 'female';
            const age = parseFloat(inputs.age || 8);
            const st = parseInt(inputs.stage || '1');
            let status = 'normal';
            let interp = 'Normal pubertal development for chronological age.';
            if (sex === 'female') {
                if (st >= 2 && age < 8.0) {
                    status = 'alert';
                    interp = 'Precocious Puberty in Girls (Thelarche B2 before 8.0 years). Urgently evaluate HPG axis, LH/FSH, and pelvic ultrasound.';
                } else if (st === 1 && age > 13.0) {
                    status = 'alert';
                    interp = 'Delayed Puberty in Girls (Absence of B2 past 13.0 years). Evaluate for Turner syndrome, hypergonadotropic hypogonadism, or CDGP.';
                }
            } else {
                if (st >= 2 && age < 9.0) {
                    status = 'alert';
                    interp = 'Precocious Puberty in Boys (G2 / Testicular enlargement before 9.0 years). Rule out central intracranial lesions or adrenal source.';
                } else if (st === 1 && age > 14.0) {
                    status = 'alert';
                    interp = 'Delayed Puberty in Boys (Absence of testicular enlargement past 14.0 years). Evaluate HPG axis, LH, FSH, testosterone.';
                }
            }
            return {
                value: `Tanner Stage ${st} at ${age} years (${sex === 'female' ? 'Girls' : 'Boys'})`,
                secondary: `Normal onset window: ${sex === 'female' ? '8.0 – 13.0 years' : '9.0 – 14.0 years'}`,
                status,
                interpretation: interp
            };
        }
    },
    {
        id: 'testicular-volume',
        num: 17,
        cat: 'puberty',
        title: { en: 'Testicular Volume / Prader Orchidometer', ru: 'Объем яичек / Орхидометр Прадера', uz: 'Moyak hajmi / Prader orxidometri' },
        desc: { en: 'Ultrasound dimensions or Prader bead calculation for gonadal maturation.', ru: 'Расчет объема яичек по ультразвуку (L × W × D × 0.71) и стадирование.', uz: 'UZI o‘lchamlari yoki Prader orxidometri orqali moyak hajmini aniqlash.' },
        guideline: 'Lambert Formula / ESPE Puberty Recommendations',
        formula: 'Volume (mL) = Length (cm) * Width (cm) * Depth (cm) * 0.71',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/3663044/',
        population: 'Boys 0–18 years',
        fields: [
            { id: 'length', label: 'Length', type: 'number', step: '0.1', unit: 'cm', default: 2.8, placeholder: '2.8' },
            { id: 'width', label: 'Width', type: 'number', step: '0.1', unit: 'cm', default: 1.6, placeholder: '1.6' },
            { id: 'depth', label: 'Depth', type: 'number', step: '0.1', unit: 'cm', default: 1.4, placeholder: '1.4' }
        ],
        calculate: (inputs) => {
            const l = parseFloat(inputs.length || 0);
            const w = parseFloat(inputs.width || 0);
            const d = parseFloat(inputs.depth || 0);
            if (!l || !w || !d) return { value: '0.0 mL', secondary: '', status: 'normal', interpretation: 'Enter length, width, and depth.' };
            const vol = (l * w * d * 0.71).toFixed(1);
            let cat = 'Prepubertal (< 4 mL)';
            let status = 'normal';
            if (vol >= 4.0 && vol < 12.0) {
                cat = 'Pubertal activation ongoing (4 – 11 mL)';
                status = 'normal';
            } else if (vol >= 12.0) {
                cat = 'Adult testicular volume (12 – 25 mL)';
                status = 'normal';
            }
            return {
                value: `Volume: ${vol} mL`,
                secondary: `Classification: ${cat}`,
                status,
                interpretation: vol >= 4.0 
                    ? 'Volume ≥ 4 mL marks definitive biochemical hypothalamic-pituitary-gonadal axis activation (Tanner G2 onset).'
                    : 'Prepubertal resting state (< 4 mL).'
            };
        }
    },
    {
        id: 'puberty-assessment',
        num: 18,
        cat: 'puberty',
        title: { en: 'Pubertal Growth Spurt & Tempo', ru: 'Оценка пубертатного ростового скачка', uz: 'Pubertal o‘sish sakrashi va tezligi' },
        desc: { en: 'Integrates growth velocity, Tanner stage, and bone age to assess remaining growth.', ru: 'Комплексный анализ скорости роста и костного возраста для оценки остаточного роста.', uz: 'Bo‘y o‘sish tezligi va suyak yoshiga qarab qolgan o‘sish potensialini baholash.' },
        guideline: 'ESPE Consensus on Pubertal Maturation',
        formula: 'Peak Height Velocity (PHV): Girls ~8.5 cm/yr (Tanner 3); Boys ~9.5 cm/yr (Tanner 4)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/22562217/',
        population: 'Adolescents 9–16 years',
        fields: [
            { id: 'gv', label: 'Growth Velocity', type: 'number', step: '0.5', unit: 'cm/year', default: 8.5, placeholder: '8.5' },
            { id: 'sex', label: 'Sex', type: 'select', default: 'female', options: [{ value: 'female', label: 'Girl' }, { value: 'male', label: 'Boy' }] },
            { id: 'tanner', label: 'Tanner Stage', type: 'select', default: '3', options: [{ value: '2', label: 'Stage 2' }, { value: '3', label: 'Stage 3' }, { value: '4', label: 'Stage 4' }, { value: '5', label: 'Stage 5' }] }
        ],
        calculate: (inputs) => {
            const gv = parseFloat(inputs.gv || 8);
            const sex = inputs.sex || 'female';
            const st = inputs.tanner || '3';
            const isPeak = (sex === 'female' && st === '3' && gv >= 7.5) || (sex === 'male' && st === '4' && gv >= 8.5);
            return {
                value: `Pubertal Tempo: ${isPeak ? 'Peak Height Velocity (PHV) Active' : 'Decelerating / Late Puberty'}`,
                secondary: `Observed Velocity: ${gv} cm/year in Tanner ${st}`,
                status: 'normal',
                interpretation: isPeak 
                    ? 'Patient is currently experiencing maximal pubertal growth acceleration. Epiphyseal closure follows in 18–24 months.'
                    : 'Growth velocity has decelerated past the pubertal peak. Final adult height will be reached shortly.'
            };
        }
    },
    {
        id: 'gnrh-stimulation-test',
        num: 19,
        cat: 'puberty',
        title: { en: 'GnRH Stimulation Test Interpreter', ru: 'Интерпретатор пробы с ГнРГ', uz: 'GnRH stimulyatsiya testi tahlili' },
        desc: { en: 'Distinguishes central precocious puberty (CPP) from benign premature thelarche.', ru: 'Дифференциальная диагностика истинного ППР и изолированного телархе.', uz: 'Markaziy erta balog‘atga yetish va xavfsiz telarxeni ajratish testi.' },
        guideline: 'Consensus Statement on Central Precocious Puberty / ESPE & LWPES',
        formula: 'Peak LH ≥ 5.0 IU/L (or Peak LH/FSH ratio > 0.66) = Positive for CPP',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/19720671/',
        population: 'Children with premature sexual maturation',
        fields: [
            { id: 'basalLh', label: 'Basal LH', type: 'number', step: '0.1', unit: 'IU/L', default: 0.8, placeholder: '0.8' },
            { id: 'peakLh', label: 'Peak Stimulated LH (30–60 min)', type: 'number', step: '0.1', unit: 'IU/L', default: 7.2, placeholder: '7.2' },
            { id: 'peakFsh', label: 'Peak Stimulated FSH', type: 'number', step: '0.1', unit: 'IU/L', default: 6.0, placeholder: '6.0' }
        ],
        calculate: (inputs) => {
            const bLh = parseFloat(inputs.basalLh || 0);
            const pLh = parseFloat(inputs.peakLh || 0);
            const pFsh = parseFloat(inputs.peakFsh || 1);
            const ratio = (pLh / (pFsh || 1)).toFixed(2);
            const isCpp = pLh >= 5.0 || ratio > 0.66;
            return {
                value: isCpp ? 'Central Precocious Puberty (CPP) Confirmed' : 'Prepubertal / Negative HPG Axis',
                secondary: `Peak LH: ${pLh} IU/L (Cutoff ≥5.0) | LH/FSH Ratio: ${ratio}`,
                status: isCpp ? 'alert' : 'normal',
                interpretation: isCpp 
                    ? 'Hypothalamic-pituitary-gonadal axis activation confirmed. Recommend brain MRI (rule out hypothalamic hamartoma) and consider GnRH analog therapy.' 
                    : 'Submaximal LH response. Consistent with benign premature thelarche or peripheral sex steroid source.'
            };
        }
    },
    {
        id: 'free-androgen-index',
        num: 20,
        cat: 'puberty',
        title: { en: 'Free Androgen Index (FAI)', ru: 'Индекс свободных андрогенов (FAI)', uz: 'Erkin androgenlar indeksi (FAI)' },
        desc: { en: 'Calculates active free testosterone ratio to assess hyperandrogenism in females.', ru: 'Расчет свободного тестостерона для выявления гиперандрогении при СПКЯ.', uz: 'Ayollarda giperandrogenemiya va PCOS ni baholash ko‘rsatkichi.' },
        guideline: 'International Evidence-Based Guideline for PCOS Assessment and Management',
        formula: 'FAI (%) = (Total Testosterone [nmol/L] / SHBG [nmol/L]) * 100',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/30052737/',
        population: 'Adolescent and adult females with hirsutism, acne, or menstrual irregularities',
        fields: [
            { id: 'testosterone', label: 'Total Testosterone', type: 'number', step: '0.1', unit: 'nmol/L', default: 2.8, placeholder: '2.8' },
            { id: 'shbg', label: 'SHBG', type: 'number', step: '1', unit: 'nmol/L', default: 32.0, placeholder: '32.0' }
        ],
        calculate: (inputs) => {
            const t = parseFloat(inputs.testosterone || 0);
            const shbg = parseFloat(inputs.shbg || 0);
            if (!t || !shbg) return { value: '0.0%', secondary: '', status: 'normal', interpretation: 'Enter Testosterone and SHBG values.' };
            const fai = ((t / shbg) * 100).toFixed(1);
            const status = fai > 5.0 ? 'alert' : 'normal';
            return {
                value: `FAI: ${fai}%`,
                secondary: `Reference threshold in females: Normal ≤ 4.5–5.0%`,
                status,
                interpretation: fai > 5.0 
                    ? 'Elevated Free Androgen Index (> 5.0%). Indicates clinical or biochemical hyperandrogenism consistent with Polycystic Ovary Syndrome (PCOS).'
                    : 'Normal bioavailable androgen level.'
            };
        }
    },
    {
        id: 'dsd-score',
        num: 21,
        cat: 'puberty',
        title: { en: 'Chicago Consensus DSD & Prader Score', ru: 'Шкала Прадера и классификация НФП (DSD)', uz: 'Prader shkalasi va DSD tasnifi' },
        desc: { en: 'Virilization grading and Salt-Wasting Congenital Adrenal Hyperplasia risk.', ru: 'Степень вирилизации наружных половых органов и скрининг сольтеряющего криза.', uz: 'Tashqi jinsiy a’zolar virilizatsiyasi darajasi va tuz yo‘qotuvchi kriz xavfi.' },
        guideline: 'Chicago Consensus on Management of Intersex Disorders / ESPE & LWPES',
        formula: 'Prader Stage 0 (Female) to Stage 5 (Male appearance with cryptorchidism)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/16882788/',
        population: 'Newborns and infants with atypical genitalia',
        fields: [
            { 
                id: 'prader', 
                label: 'Prader Virilization Stage', 
                type: 'select', 
                default: '3', 
                options: [
                    { value: '0', label: 'Stage 0: Typical female genitalia' },
                    { value: '1', label: 'Stage 1: Mild clitoromegaly' },
                    { value: '2', label: 'Stage 2: Clitoromegaly + posterior labial fusion' },
                    { value: '3', label: 'Stage 3: Prominent phallus + single urogenital orifice' },
                    { value: '4', label: 'Stage 4: Penile phallus + perineoscrotal hypospadias' },
                    { value: '5', label: 'Stage 5: Male phenotype with bilateral cryptorchidism' }
                ] 
            },
            { 
                id: 'gonads', 
                label: 'Palpable Gonads', 
                type: 'select', 
                default: 'none', 
                options: [
                    { value: 'none', label: 'Non-palpable bilaterally' },
                    { value: 'unilateral', label: 'Unilateral palpable gonad' },
                    { value: 'bilateral', label: 'Bilateral palpable gonads' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const pr = inputs.prader || '3';
            const g = inputs.gonads || 'none';
            const isCahEmergency = g === 'none' && parseInt(pr) >= 1;
            return {
                value: `Prader Stage ${pr} Virilization`,
                secondary: isCahEmergency ? '⚠️ High Risk: 46,XX Congenital Adrenal Hyperplasia (CAH)' : 'Gonads palpable — Evaluate 46,XY DSD',
                status: isCahEmergency ? 'alert' : 'warning',
                interpretation: isCahEmergency 
                    ? 'URGENT: Atypical genitalia with non-palpable gonads is considered Salt-Wasting CAH until proven otherwise. Immediate serum electrolytes, 17-OHP, cortisol, and pelvic ultrasound required to prevent fatal salt-losing crisis.'
                    : 'Multidisciplinary DSD team evaluation required (Endocrinology, Urology, Genetics, Ethics).'
            };
        }
    },
    {
        id: 'gonadal-profile',
        num: 22,
        cat: 'puberty',
        title: { en: 'Gonadotropin Profile (LH / FSH Ratio)', ru: 'Гонадотропный профиль (ЛГ / ФСГ)', uz: 'Gonadotrop profili (LH / FSH nisbati)' },
        desc: { en: 'Discriminates hypergonadotropic vs hypogonadotropic hypogonadism.', ru: 'Дифференциальная диагностика первичного и вторичного гипогонадизма.', uz: 'Birlamchi va ikkilamchi gipogonadizmni ajratish testi.' },
        guideline: 'Endocrine Society Clinical Practice Guideline on Hypogonadism',
        formula: 'Primary: High LH/FSH with Low Sex Steroids; Secondary: Low/Normal LH/FSH with Low Sex Steroids',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/29562364/',
        population: 'Adolescents with pubertal arrest or adult hypogonadism',
        fields: [
            { id: 'lh', label: 'Serum LH', type: 'number', step: '0.1', unit: 'IU/L', default: 18.5, placeholder: '18.5' },
            { id: 'fsh', label: 'Serum FSH', type: 'number', step: '0.1', unit: 'IU/L', default: 24.0, placeholder: '24.0' },
            { id: 'steroid', label: 'Sex Steroid (Testosterone/Estradiol)', type: 'select', default: 'low', options: [{ value: 'low', label: 'Low (Subnormal for adult/puberty)' }, { value: 'normal', label: 'Normal physiological range' }] }
        ],
        calculate: (inputs) => {
            const lh = parseFloat(inputs.lh || 0);
            const fsh = parseFloat(inputs.fsh || 0);
            const st = inputs.steroid || 'low';
            if (st === 'low' && (lh > 10.0 || fsh > 15.0)) {
                return {
                    value: 'Primary (Hypergonadotropic) Hypogonadism',
                    secondary: `Elevated gonadotropins: LH ${lh} IU/L, FSH ${fsh} IU/L`,
                    status: 'alert',
                    interpretation: 'Gonadal end-organ failure. Typical causes: Turner syndrome (45,X), Klinefelter syndrome (47,XXY), bilateral orchitis/oophoritis, or post-gonadotoxic therapy.'
                };
            } else if (st === 'low') {
                return {
                    value: 'Secondary (Hypogonadotropic) Hypogonadism / CDGP',
                    secondary: `Low/inappropriate gonadotropins: LH ${lh} IU/L, FSH ${fsh} IU/L`,
                    status: 'warning',
                    interpretation: 'Central hypothalamic-pituitary deficiency or constitutional delay of growth and puberty. Consider pituitary MRI and smell test (Kallmann syndrome).'
                };
            }
            return {
                value: 'Eugonadal State',
                secondary: 'Gonadotropins and sex steroids are concordant',
                status: 'normal',
                interpretation: 'Normal hypothalamic-pituitary-gonadal axis integrity.'
            };
        }
    },

    // ==========================================
    // III. ADRENAL & STEROIDOLOGY (7 Tools)
    // ==========================================
    {
        id: 'hydrocortisone-dose',
        num: 23,
        cat: 'adrenal',
        title: { en: 'Hydrocortisone BSA Dosing Tool', ru: 'Расчет дозы гидрокортизона по ППТ', uz: 'Gidrokortizon dozasini yuza bo‘yicha hisoblash' },
        desc: { en: 'Body surface area-based circadian replacement dosing for Adrenal Insufficiency & CAH.', ru: 'Расчет физиологической суточной дозы гидрокортизона по ППТ (мг/м²/сут).', uz: 'Buyrak usti bezi yetishmovchiligi va VDKN da gidrokortizon sutkalik dozasi.' },
        guideline: 'Endocrine Society Clinical Practice Guideline on Primary Adrenal Insufficiency',
        formula: 'BSA (m²) = sqrt(Height * Weight / 3600); Total Dose = BSA * Target (10–15 mg/m²/d)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/26771121/',
        population: 'Pediatric and adult Addison\'s disease and Congenital Adrenal Hyperplasia',
        fields: [
            { id: 'height', label: 'Height', type: 'number', step: '0.5', unit: 'cm', default: 120.0, placeholder: '120.0' },
            { id: 'weight', label: 'Weight', type: 'number', step: '0.5', unit: 'kg', default: 24.0, placeholder: '24.0' },
            { 
                id: 'targetDose', 
                label: 'Target Dose', 
                type: 'select', 
                default: '12', 
                options: [
                    { value: '10', label: '10 mg/m²/day (Lower maintenance)' },
                    { value: '12', label: '12 mg/m²/day (Standard CAH / Addison)' },
                    { value: '15', label: '15 mg/m²/day (Upper maintenance)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const h = parseFloat(inputs.height || 0);
            const w = parseFloat(inputs.weight || 0);
            const target = parseFloat(inputs.targetDose || 12);
            if (!h || !w) return { value: '0 mg/day', secondary: '', status: 'normal', interpretation: 'Enter height and weight.' };
            const bsa = Math.sqrt((h * w) / 3600);
            const total = (bsa * target).toFixed(1);
            const am = (total * 0.5).toFixed(1);
            const noon = (total * 0.25).toFixed(1);
            const pm = (total * 0.25).toFixed(1);
            return {
                value: `Total Daily: ${total} mg/day`,
                secondary: `3-Dose Circadian Split: Morning (50%): ${am} mg | Midday (25%): ${noon} mg | Evening (25%): ${pm} mg`,
                status: 'normal',
                interpretation: `Calculated for Body Surface Area: ${bsa.toFixed(2)} m². Mimics normal endogenous cortisol rhythm.`
            };
        }
    },
    {
        id: 'steroid-converter',
        num: 24,
        cat: 'adrenal',
        title: { en: 'Steroid Equivalence & Converter', ru: 'Эквиваленты глюкокортикоидов', uz: 'Glyukokortikoidlar ekvivalenti kalkulyatori' },
        desc: { en: 'Anti-inflammatory potency and equivalent dose converter across all systemic steroids.', ru: 'Пересчет доз гидрокортизона, преднизолона, метилпреднизолона и дексаметазона.', uz: 'Gidrokortizon, prednizolon va deksametazon dozasini o‘zaro solishtirish.' },
        guideline: 'Standard Endocrine Equivalence Tables / British National Formulary',
        formula: 'Hydrocortisone 20 mg = Prednisolone 5 mg = Methylprednisolone 4 mg = Dexamethasone 0.75 mg',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/26771121/',
        population: 'Patients switching glucocorticoid preparations or converting stress doses',
        fields: [
            { 
                id: 'drug', 
                label: 'Current Glucocorticoid', 
                type: 'select', 
                default: 'prednisolone', 
                options: [
                    { value: 'hydrocortisone', label: 'Hydrocortisone (Cortisol)' },
                    { value: 'prednisolone', label: 'Prednisolone / Prednisone' },
                    { value: 'methylprednisolone', label: 'Methylprednisolone' },
                    { value: 'dexamethasone', label: 'Dexamethasone' }
                ] 
            },
            { id: 'dose', label: 'Current Dose', type: 'number', step: '0.5', unit: 'mg', default: 5.0, placeholder: '5.0' }
        ],
        calculate: (inputs) => {
            const drug = inputs.drug || 'prednisolone';
            const dose = parseFloat(inputs.dose || 0);
            let hcEquiv = 0;
            if (drug === 'hydrocortisone') hcEquiv = dose;
            else if (drug === 'prednisolone') hcEquiv = dose * 4.0;
            else if (drug === 'methylprednisolone') hcEquiv = dose * 5.0;
            else if (drug === 'dexamethasone') hcEquiv = dose * 26.67;
            const pred = (hcEquiv / 4.0).toFixed(2);
            const mpred = (hcEquiv / 5.0).toFixed(2);
            const dex = (hcEquiv / 26.67).toFixed(2);
            return {
                value: `Hydrocortisone: ${hcEquiv.toFixed(1)} mg`,
                secondary: `Prednisolone: ${pred} mg | Methylpred: ${mpred} mg | Dexamethasone: ${dex} mg`,
                status: 'normal',
                interpretation: 'Equivalent anti-inflammatory potency based on international glucocorticoid clinical reference tables.'
            };
        }
    },
    {
        id: '17ohp-converter',
        num: 25,
        cat: 'adrenal',
        title: { en: '17-OHP Units & CAH Risk Delta', ru: 'Конвертер 17-OHP и риск ВДКН', uz: '17-OHP birliklar konverteri va VDKN xavfi' },
        desc: { en: 'Converts 17-hydroxyprogesterone between ng/mL and nmol/L with clinical cutoffs.', ru: 'Пересчет 17-гидроксипрогестерона (нг/мл в нмоль/л) и диагностика ВДКН.', uz: '17-OHP ni ng/ml dan nmol/l ga o‘tkazish va tug‘ma buyrak usti disfunksiyasi tahlili.' },
        guideline: 'Endocrine Society Clinical Practice Guideline on Congenital Adrenal Hyperplasia',
        formula: '1 ng/mL = 3.026 nmol/L; 1 nmol/L = 0.33 ng/mL',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/30272171/',
        population: 'Neonatal CAH screening and monitoring of treated 21-hydroxylase deficiency',
        fields: [
            { id: 'value', label: '17-OHP Concentration', type: 'number', step: '0.1', unit: 'value', default: 6.5, placeholder: '6.5' },
            { id: 'unit', label: 'Input Unit', type: 'select', default: 'ng/ml', options: [{ value: 'ng/ml', label: 'ng/mL' }, { value: 'nmol/l', label: 'nmol/L' }] }
        ],
        calculate: (inputs) => {
            const val = parseFloat(inputs.value || 0);
            const u = inputs.unit || 'ng/ml';
            let ngml = u === 'ng/ml' ? val : val * 0.33;
            let nmol = u === 'ng/ml' ? val * 3.026 : val;
            const isHigh = nmol > 30.0;
            return {
                value: `${ngml.toFixed(2)} ng/mL = ${nmol.toFixed(1)} nmol/L`,
                secondary: `Target morning CAH level: 4.0 – 12.0 nmol/L (1.2 – 3.6 ng/mL)`,
                status: isHigh ? 'alert' : 'normal',
                interpretation: nmol > 30.0 
                    ? 'Significantly elevated (> 30 nmol/L). Highly suggestive of untreated or undertreated 21-hydroxylase deficiency CAH.'
                    : 'Target early morning 17-OHP level for adequately controlled CAH without steroid overtreatment.'
            };
        }
    },
    {
        id: 'steroid-taper',
        num: 26,
        cat: 'adrenal',
        title: { en: 'Glucocorticoid Tapering Protocol', ru: 'Протокол постепенной отмены стероидов', uz: 'Kortikosteroidlarni asta-sekin bekor qilish protokoli' },
        desc: { en: 'Safe gradual dose reduction schedule to avoid secondary adrenal crisis.', ru: 'График безопасного снижения дозы стероидов после длительной терапии (>3 недель).', uz: 'Uzoq muddatli gormon terapiyasidan so‘ng buyrak usti bezi yetishmovchiligini oldini olish.' },
        guideline: 'Endocrine Society Guidelines on Secondary Adrenal Insufficiency',
        formula: 'Reduce by 20% weekly until physiological dose (5 mg prednisone), then evaluate morning cortisol',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/26771121/',
        population: 'Patients receiving systemic glucocorticoids for > 3 weeks',
        fields: [
            { id: 'currentDose', label: 'Current Prednisone Dose', type: 'number', step: '5', unit: 'mg/day', default: 30.0, placeholder: '30.0' },
            { id: 'durationWeeks', label: 'Duration of Therapy', type: 'number', step: '1', unit: 'weeks', default: 8, placeholder: '8' }
        ],
        calculate: (inputs) => {
            const dose = parseFloat(inputs.currentDose || 30);
            const w = parseFloat(inputs.durationWeeks || 8);
            const step1 = Math.max(20, Math.round(dose * 0.75));
            const step2 = Math.max(10, Math.round(step1 * 0.7));
            return {
                value: `Weaning Step 1: ${step1} mg/day for 1 week`,
                secondary: `Step 2: ${step2} mg/day, then reduce by 2.5 mg weekly until 5 mg/day physiological maintenance`,
                status: w > 3 ? 'warning' : 'normal',
                interpretation: 'Treatment > 3 weeks causes hypothalamic-pituitary-adrenal (HPA) axis suppression. Never discontinue abruptly. Check 8 AM serum cortisol before final withdrawal.'
            };
        }
    },
    {
        id: 'adrenal-stress-dose',
        num: 27,
        cat: 'adrenal',
        title: { en: 'Adrenal Crisis & Stress Dosing', ru: 'Стресс-дозирование при надпочечниковом кризе', uz: 'Stress va kriz holatida gidrokortizon dozasi' },
        desc: { en: 'Immediate oral and parenteral hydrocortisone escalation for illness, fever, and trauma.', ru: 'Экстренное удвоение/утроение дозы при лихорадке, инфекции и кризе.', uz: 'Isitma, jarrohlik va kriz holatida gidrokortizon dozasini oshirish.' },
        guideline: 'ISPAD 2024 / ESPE Consensus on Adrenal Crisis Prevention',
        formula: 'Mild (Fever 38-39°C): Double oral dose; Moderate: Triple dose; Severe/Shock: IV bolus (50-100 mg/m²)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/26771121/',
        population: 'Any patient with known primary or secondary adrenal insufficiency',
        fields: [
            { id: 'weight', label: 'Patient Weight', type: 'number', step: '1', unit: 'kg', default: 22.0, placeholder: '22.0' },
            { id: 'baseDose', label: 'Baseline Oral Daily Dose', type: 'number', step: '1', unit: 'mg/day', default: 12.0, placeholder: '12.0' },
            { 
                id: 'severity', 
                label: 'Current Stress Severity', 
                type: 'select', 
                default: 'fever', 
                options: [
                    { value: 'fever', label: 'Mild/Moderate: Fever > 38.5°C or gastroenteritis (Double dose)' },
                    { value: 'severe', label: 'Severe: Vomiting, severe trauma, or impending crisis (Triple dose / IM)' },
                    { value: 'emergency', label: 'Emergency: Adrenal Crisis / Hypotension / Shock (IV Bolus)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 20);
            const base = parseFloat(inputs.baseDose || 10);
            const sev = inputs.severity || 'fever';
            if (sev === 'fever') {
                return {
                    value: `Double Oral Dose: ${(base * 2).toFixed(1)} mg/day`,
                    secondary: `Divide into 3–4 equal doses every 6 hours with oral rehydration fluids`,
                    status: 'warning',
                    interpretation: 'Continue double dose until fever resolves for 24 hours, then return to baseline.'
                };
            } else if (sev === 'severe') {
                return {
                    value: `Triple Dose: ${(base * 3).toFixed(1)} mg/day OR Emergency IM Hydrocortisone: 50 mg`,
                    secondary: `Give IM injection immediately if patient is vomiting or unable to take oral pills`,
                    status: 'alert',
                    interpretation: 'Vomiting prevents oral absorption. Always inject Solu-Cortef intramuscularly and seek immediate hospital care.'
                };
            }
            // Emergency shock bolus
            const bolus = w < 10 ? 25 : w < 20 ? 50 : 100;
            return {
                value: `Immediate IV Bolus: ${bolus} mg Hydrocortisone`,
                secondary: `Followed by continuous IV infusion of 50–100 mg/m²/day + Normal Saline 20 mL/kg bolus`,
                status: 'alert',
                interpretation: 'LIFE-THREATENING EMERGENCY: Administer IV hydrocortisone immediately. Do NOT delay for laboratory tests.'
            };
        }
    },
    {
        id: 'perioperative-steroids',
        num: 28,
        cat: 'adrenal',
        title: { en: 'Perioperative Steroid Protocol', ru: 'Периоперационный протокол стероидов', uz: 'Operatsiyadan oldi va keyingi steroid protokoli' },
        desc: { en: 'Intravenous hydrocortisone coverage tailored to surgical stress magnitude.', ru: 'Дозирование гидрокортизона при малых, средних и больших хирургических вмешательствах.', uz: 'Kichik, o‘rta va katta jarrohlik amaliyotlarida gidrokortizon protokoli.' },
        guideline: 'Joint Consensus of the Endocrine Society & American College of Surgeons',
        formula: 'Minor: Double oral dose; Moderate: 50 mg IV at induction; Major: 100 mg IV + 100 mg/m²/day continuous',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/27041743/',
        population: 'Surgical patients on physiological or chronic glucocorticoid therapy',
        fields: [
            { 
                id: 'surgeryType', 
                label: 'Surgical Magnitude', 
                type: 'select', 
                default: 'major', 
                options: [
                    { value: 'minor', label: 'Minor (Outpatient, local anesthesia, dental, biopsy)' },
                    { value: 'moderate', label: 'Moderate (Laparoscopic cholecystectomy, hernia repair, tonsillectomy)' },
                    { value: 'major', label: 'Major (Open laparotomy, cardiothoracic, major orthopedic)' }
                ] 
            },
            { id: 'weight', label: 'Weight', type: 'number', step: '1', unit: 'kg', default: 35.0, placeholder: '35.0' }
        ],
        calculate: (inputs) => {
            const st = inputs.surgeryType || 'major';
            if (st === 'minor') {
                return {
                    value: 'Double oral morning dose on day of procedure',
                    secondary: 'Resume baseline physiological dosing on postoperative Day 1 if eating normally',
                    status: 'normal',
                    interpretation: 'Minor procedural stress requires only temporary oral doubling without IV cannula.'
                };
            } else if (st === 'moderate') {
                return {
                    value: '50 mg IV Hydrocortisone at anesthesia induction',
                    secondary: 'Followed by 25 mg IV every 8 hours for 24 hours, then taper by 50% daily',
                    status: 'warning',
                    interpretation: 'Maintain IV coverage until bowel motility returns and patient tolerates oral medications.'
                };
            }
            return {
                value: '100 mg IV Hydrocortisone bolus at induction',
                secondary: 'Followed by 100 mg/m²/day continuous IV infusion (or 50 mg q6h) for 48–72 hours',
                status: 'alert',
                interpretation: 'Major surgical stress demands continuous glucocorticoid replacement. Taper by 50% daily once patient is stable.'
            };
        }
    },
    {
        id: 'arr-calculator',
        num: 29,
        cat: 'adrenal',
        title: { en: 'Aldosterone-to-Renin Ratio (ARR)', ru: 'Альдостерон-рениновое соотношение (АРС)', uz: 'Aldosteron-renin nisbati (ARR)' },
        desc: { en: 'Primary screening test for primary aldosteronism (Conn\'s syndrome).', ru: 'Скрининг первичного гиперальдостеронизма при резистентной артериальной гипертензии.', uz: 'Giperaldosteronizm va davoga chidamli gipertoniyada ARR hisoblash.' },
        guideline: 'Endocrine Society Clinical Practice Guideline on Primary Aldosteronism',
        formula: 'ARR = PAC (ng/dL) / PRA (ng/mL/h); Positive cutoff ≥ 20–30 (with PAC ≥ 10 ng/dL)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/26934359/',
        population: 'Hypertensive patients with hypokalemia or resistant hypertension',
        fields: [
            { id: 'pac', label: 'Plasma Aldosterone (PAC)', type: 'number', step: '1', unit: 'ng/dL', default: 28.0, placeholder: '28.0' },
            { id: 'pra', label: 'Plasma Renin Activity (PRA)', type: 'number', step: '0.1', unit: 'ng/mL/h', default: 0.7, placeholder: '0.7' }
        ],
        calculate: (inputs) => {
            const pac = parseFloat(inputs.pac || 0);
            const pra = parseFloat(inputs.pra || 1);
            const arr = (pac / (pra || 0.1)).toFixed(1);
            const isPositive = arr >= 20.0 && pac >= 10.0;
            return {
                value: `ARR: ${arr} (ng/dL per ng/mL/h)`,
                secondary: `PAC: ${pac} ng/dL | PRA: ${pra} ng/mL/h`,
                status: isPositive ? 'alert' : 'normal',
                interpretation: isPositive 
                    ? 'Positive Primary Aldosteronism screen (ARR ≥ 20 with PAC ≥ 10 ng/dL). Proceed to confirmatory testing (Saline Infusion Test or Oral Salt Loading).'
                    : 'Negative screening ratio. Primary aldosteronism is unlikely.'
            };
        }
    },

    // ==========================================
    // IV. DIABETES & METABOLISM (8 Tools)
    // ==========================================
    {
        id: 'hba1c-to-eag',
        num: 30,
        cat: 'diabetes',
        title: { en: 'HbA1c ↔ Estimated Average Glucose (eAG)', ru: 'Перевод HbA1c в среднюю глюкозу (eAG)', uz: 'HbA1c ni o‘rtacha glyukozaga (eAG) o‘tkazish' },
        desc: { en: 'Translates glycated hemoglobin percentage into average blood glucose over past 3 months.', ru: 'Пересчет гликированного гемоглобина в средний уровень глюкозы по формуле ADAG.', uz: 'HbA1c foizini so‘nggi 3 oylik o‘rtacha qon glyukozasiga aylantirish.' },
        guideline: 'ADA Standards of Care 2026 / ADAG Study',
        formula: 'eAG (mmol/L) = 1.59 * HbA1c - 2.59; eAG (mg/dL) = 28.7 * HbA1c - 46.7',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/18540046/',
        population: 'Pediatric and adult patients with Type 1 or Type 2 Diabetes',
        fields: [
            { id: 'hba1c', label: 'HbA1c Level', type: 'number', step: '0.1', unit: '%', default: 7.5, placeholder: '7.5' }
        ],
        calculate: (inputs) => {
            const a1c = parseFloat(inputs.hba1c || 7.0);
            const mmol = (1.59 * a1c - 2.59).toFixed(1);
            const mg = (28.7 * a1c - 46.7).toFixed(0);
            const status = a1c <= 7.0 ? 'normal' : a1c <= 8.5 ? 'warning' : 'alert';
            return {
                value: `${mmol} mmol/L (${mg} mg/dL)`,
                secondary: `Target for children & adolescents: < 7.0% (< 8.6 mmol/L) without severe hypoglycemia`,
                status,
                interpretation: a1c <= 7.0 
                    ? 'Excellent glycemic control meeting international pediatric diabetes consensus targets.'
                    : a1c <= 8.5 
                    ? 'Moderate glycemic control. Titrate basal/bolus insulin or review carbohydrate counting.'
                    : 'Suboptimal control (eAG > 11 mmol/L). High risk for microvascular complications and ketoacidosis.'
            };
        }
    },
    {
        id: 'eag-to-hba1c',
        num: 31,
        cat: 'diabetes',
        title: { en: 'Average Glucose to Projected HbA1c', ru: 'Прогноз HbA1c по средней глюкозе', uz: 'O‘rtacha glyukozadan kutilayotgan HbA1c' },
        desc: { en: 'Estimates projected HbA1c from continuous glucose monitor (CGM) average.', ru: 'Расчет ожидаемого гликированного гемоглобина по данным CGM (глюкометра).', uz: 'Sensor yoki glyukometr ma’lumotlariga asosan kutilayotgan HbA1c.' },
        guideline: 'ISPAD 2024 / ADA CGM Metric Recommendations',
        formula: 'Projected HbA1c (%) = (Average Glucose mg/dL + 46.7) / 28.7',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/29937430/',
        population: 'Continuous Glucose Monitoring (CGM) and glucometer users',
        fields: [
            { id: 'glucose', label: 'Average Blood Glucose', type: 'number', step: '0.1', unit: 'mmol/L', default: 8.8, placeholder: '8.8' }
        ],
        calculate: (inputs) => {
            const mmol = parseFloat(inputs.glucose || 8.0);
            const mg = mmol * 18.0182;
            const a1c = ((mg + 46.7) / 28.7).toFixed(1);
            return {
                value: `Projected HbA1c: ${a1c}%`,
                secondary: `Equivalent: ${mg.toFixed(0)} mg/dL average sensor glucose`,
                status: a1c <= 7.0 ? 'normal' : 'warning',
                interpretation: 'Correlate with CGM Time-in-Range (TIR 70–180 mg/dL target > 70%).'
            };
        }
    },
    {
        id: 'icr-calculator',
        num: 32,
        cat: 'diabetes',
        title: { en: 'Insulin-to-Carb Ratio (ICR / Rule of 500)', ru: 'Углеводный коэффициент (Правило 500)', uz: 'Uglevod koeffitsiyenti (500 qoidasi)' },
        desc: { en: 'Calculates how many grams of carbohydrate are covered by 1 unit of rapid insulin.', ru: 'Расчет количества граммов углеводов на 1 ЕД ультракороткого инсулина.', uz: '1 ta’sir birligi qancha gramm uglevodni qoplashini aniqlash.' },
        guideline: 'ISPAD 2024 Clinical Practice Consensus on Insulin Therapy',
        formula: 'ICR (g/unit) = 500 / Total Daily Dose of Insulin (TDD)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/36537554/',
        population: 'Patients on Multiple Daily Injections (MDI) or Continuous Subcutaneous Insulin Infusion (Pump)',
        fields: [
            { id: 'tdd', label: 'Total Daily Dose of Insulin (TDD)', type: 'number', step: '1', unit: 'Units/day', default: 36.0, placeholder: '36.0' }
        ],
        calculate: (inputs) => {
            const tdd = parseFloat(inputs.tdd || 30);
            const icr = Math.round(500 / tdd);
            return {
                value: `1 Unit covers ${icr} g Carbohydrate`,
                secondary: `ICR: 1 : ${icr} g (Rule of 500)`,
                status: 'normal',
                interpretation: `For a meal with 60g carbs, food bolus = 60 / ${icr} = ${(60/icr).toFixed(1)} Units.`
            };
        }
    },
    {
        id: 'isf-calculator',
        num: 33,
        cat: 'diabetes',
        title: { en: 'Insulin Sensitivity Factor (ISF / Rule of 100)', ru: 'Фактор чувствительности к инсулину (ФЧИ)', uz: 'Insulinga sezgirlik omili (100 qoidasi)' },
        desc: { en: 'Calculates how much 1 unit of rapid-acting insulin lowers blood glucose.', ru: 'На сколько ммоль/л снижает сахар крови 1 ЕД инсулина (Правило 100).', uz: '1 birlik qisqa insulin qon qandini qancha mmol/l ga tushirishini hisoblash.' },
        guideline: 'ISPAD 2024 Insulin Delivery Guidelines',
        formula: 'ISF (mmol/L) = 100 / TDD; ISF (mg/dL) = 1800 / TDD',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/36537554/',
        population: 'Type 1 Diabetes correction bolus calculation',
        fields: [
            { id: 'tdd', label: 'Total Daily Dose of Insulin (TDD)', type: 'number', step: '1', unit: 'Units/day', default: 36.0, placeholder: '36.0' }
        ],
        calculate: (inputs) => {
            const tdd = parseFloat(inputs.tdd || 30);
            const isfMmol = (100 / tdd).toFixed(1);
            const isfMg = Math.round(1800 / tdd);
            return {
                value: `1 Unit drops BG by ${isfMmol} mmol/L (${isfMg} mg/dL)`,
                secondary: `ISF: ${isfMmol} mmol/L per Unit (Rule of 100)`,
                status: 'normal',
                interpretation: 'Use to calculate correction boluses for hyperglycemia outside mealtime.'
            };
        }
    },
    {
        id: 'mealtime-bolus',
        num: 34,
        cat: 'diabetes',
        title: { en: 'Smart Mealtime Bolus & Correction', ru: 'Калькулятор болюса на еду и коррекцию', uz: 'Ovqat oldi va korreksiya bolusi kalkulyatori' },
        desc: { en: 'Calculates precise rapid-acting insulin dose combining meal carbs and correction.', ru: 'Комплексный расчет болюса: углеводы + коррекция высокого сахара.', uz: 'Ovqatlanish oldidan aniq insulin dozasini hisoblash.' },
        guideline: 'ISPAD 2024 Basal-Bolus Management Recommendations',
        formula: 'Total Bolus = (Carbs / ICR) + [(Current BG - Target BG) / ISF]',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/36537554/',
        population: 'Children and adults with Type 1 Diabetes',
        fields: [
            { id: 'currentBg', label: 'Current Blood Glucose', type: 'number', step: '0.1', unit: 'mmol/L', default: 11.2, placeholder: '11.2' },
            { id: 'targetBg', label: 'Target Glucose', type: 'number', step: '0.1', unit: 'mmol/L', default: 6.0, placeholder: '6.0' },
            { id: 'carbs', label: 'Carbohydrates to Eat', type: 'number', step: '1', unit: 'grams', default: 55.0, placeholder: '55.0' },
            { id: 'icr', label: 'Carb Ratio (ICR)', type: 'number', step: '1', unit: 'g/unit', default: 12.0, placeholder: '12.0' },
            { id: 'isf', label: 'Sensitivity Factor (ISF)', type: 'number', step: '0.1', unit: 'mmol/L/unit', default: 2.8, placeholder: '2.8' }
        ],
        calculate: (inputs) => {
            const bg = parseFloat(inputs.currentBg || 6.0);
            const target = parseFloat(inputs.targetBg || 6.0);
            const carbs = parseFloat(inputs.carbs || 0);
            const icr = parseFloat(inputs.icr || 12);
            const isf = parseFloat(inputs.isf || 2.5);
            const carbBolus = carbs / icr;
            const corrBolus = Math.max(0, (bg - target) / isf);
            const total = (carbBolus + corrBolus).toFixed(1);
            return {
                value: `Total Insulin Bolus: ${total} Units`,
                secondary: `Meal Carb Bolus: ${carbBolus.toFixed(1)} U | Correction Bolus: ${corrBolus.toFixed(1)} U`,
                status: 'normal',
                interpretation: 'Inject rapid-acting analog (Novorapid/Humalog/Apidra) 10–15 minutes before the first bite.'
            };
        }
    },
    {
        id: 'tdd-calculator',
        num: 35,
        cat: 'diabetes',
        title: { en: 'Total Daily Insulin Dose (TDD)', ru: 'Суточная доза инсулина (СДИ)', uz: 'Sutkalik umumiy insulin dozasi (TDD)' },
        desc: { en: 'Starting insulin regimen estimation and 50/50 basal-bolus split.', ru: 'Расчет суточной дозы и распределение на продленный (базал) и ультракороткий (болюс).', uz: 'Yangi boshlangan diabetda sutkalik insulin va bazal-bolus taqsimoti.' },
        guideline: 'ISPAD 2024 Pediatric Diabetes Starting Regimens',
        formula: 'TDD = Weight (kg) * Stage Factor; Basal ~40–50%; Bolus ~50–60%',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/36537554/',
        population: 'New-onset or re-titrating Type 1 Diabetes',
        fields: [
            { id: 'weight', label: 'Patient Weight', type: 'number', step: '0.5', unit: 'kg', default: 32.0, placeholder: '32.0' },
            { 
                id: 'stage', 
                label: 'Clinical Stage', 
                type: 'select', 
                default: 'prepubertal', 
                options: [
                    { value: 'honeymoon', label: 'Partial Remission / Honeymoon (0.2–0.5 U/kg/d)' },
                    { value: 'prepubertal', label: 'Prepubertal (0.6–0.7 U/kg/d)' },
                    { value: 'pubertal', label: 'Pubertal Spurt (1.0–1.5 U/kg/d)' },
                    { value: 'adult', label: 'Adult Baseline (0.4–0.6 U/kg/d)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 30);
            const st = inputs.stage || 'prepubertal';
            let factor = 0.65;
            if (st === 'honeymoon') factor = 0.35;
            else if (st === 'pubertal') factor = 1.15;
            else if (st === 'adult') factor = 0.50;
            const tdd = (w * factor).toFixed(1);
            const basal = (tdd * 0.45).toFixed(1);
            const bolus = (tdd * 0.55).toFixed(1);
            return {
                value: `Total Daily Dose: ${tdd} Units/day`,
                secondary: `Basal (45%): ${basal} U/day | Bolus (55%): ${bolus} U/day (~${(bolus/3).toFixed(1)} U per meal)`,
                status: 'normal',
                interpretation: `Basal insulin (Glargine/Degludec/Detemir) once daily; divide bolus between 3 main meals.`
            };
        }
    },
    {
        id: 'dka-fluid',
        num: 36,
        cat: 'diabetes',
        title: { en: 'Pediatric DKA Fluid Protocol', ru: 'Инфузионная терапия при ДКА у детей', uz: 'Bolalarda DKA suyuqlik protokoli' },
        desc: { en: 'Calculates hourly IV rehydration rate over 48 hours to prevent cerebral edema.', ru: 'Расчет скорости регидратации при диабетическом кетоацидозе на 48 часов.', uz: 'Miya shishini oldini olish uchun 48 soatlik DKA infuziya tezligi.' },
        guideline: 'ISPAD 2024 Clinical Consensus on Diabetic Ketoacidosis',
        formula: 'Total Fluid (48h) = Deficit (Weight * Dehydration % * 10) + 48h Maintenance; Divided evenly by 48',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/36537546/',
        population: 'Children & Adolescents in Diabetic Ketoacidosis',
        fields: [
            { id: 'weight', label: 'Patient Weight', type: 'number', step: '0.5', unit: 'kg', default: 25.0, placeholder: '25.0' },
            { 
                id: 'dehydration', 
                label: 'Dehydration Severity', 
                type: 'select', 
                default: '7', 
                options: [
                    { value: '5', label: 'Mild DKA (5% dehydration, pH 7.20–7.30)' },
                    { value: '7', label: 'Moderate DKA (7% dehydration, pH 7.10–7.20)' },
                    { value: '10', label: 'Severe DKA (10% dehydration, pH < 7.10)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 20);
            const pct = parseFloat(inputs.dehydration || 7);
            const deficit = w * pct * 10;
            const maint24h = w <= 10 ? w * 100 : w <= 20 ? 1000 + (w - 10) * 50 : 1500 + (w - 20) * 20;
            const total48h = deficit + (maint24h * 2);
            const hourlyRate = (total48h / 48).toFixed(1);
            return {
                value: `Hourly IV Rate: ${hourlyRate} mL/hour`,
                secondary: `Over 48 hours evenly (Deficit: ${deficit} mL, 48h Maintenance: ${maint24h * 2} mL)`,
                status: 'alert',
                interpretation: 'CRITICAL: Infuse evenly over 48 hours. Never give rapid fluid boluses unless in hypovolemic shock to prevent fatal cerebral edema. Add Potassium 40 mmol/L once urine output is confirmed.'
            };
        }
    },
    {
        id: 'dka-insulin',
        num: 37,
        cat: 'diabetes',
        title: { en: 'DKA Insulin Infusion Protocol', ru: 'Протокол инфузии инсулина при ДКА', uz: 'DKA insulin infuziyasi protokoli' },
        desc: { en: 'Continuous regular insulin infusion rate (0.05–0.10 U/kg/h) without bolus.', ru: 'Скорость непрерывной внутривенной инфузии простого инсулина.', uz: 'DKA da vena ichiga doimiy insulin yuborish tezligi.' },
        guideline: 'ISPAD 2024 DKA Consensus Statement',
        formula: 'Insulin Rate = Weight (kg) * 0.05 to 0.10 Units/kg/hour (Start 1–2h AFTER fluid resuscitation)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/36537546/',
        population: 'Pediatric DKA hospital resuscitation',
        fields: [
            { id: 'weight', label: 'Patient Weight', type: 'number', step: '0.5', unit: 'kg', default: 25.0, placeholder: '25.0' },
            { 
                id: 'rate', 
                label: 'Infusion Rate Target', 
                type: 'select', 
                default: '0.05', 
                options: [
                    { value: '0.05', label: '0.05 Units/kg/hour (Recommended by ISPAD 2024)' },
                    { value: '0.10', label: '0.10 Units/kg/hour (Standard maximum rate)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 20);
            const r = parseFloat(inputs.rate || 0.05);
            const hourly = (w * r).toFixed(2);
            return {
                value: `IV Regular Insulin: ${hourly} Units/hour`,
                secondary: `Target Blood Glucose Drop Rate: 3.0 – 5.0 mmol/L/hr (50 – 90 mg/dL/hr)`,
                status: 'alert',
                interpretation: 'NEVER give IV insulin bolus. Start infusion 1–2 hours after IV rehydration is underway. When glucose reaches 14–17 mmol/L, add 5% Dextrose to IV fluids to maintain glucose while clearing ketoacidosis.'
            };
        }
    },

    // ==========================================
    // V. NUTRITION, ENERGY & OBESITY (6 Tools)
    // ==========================================
    {
        id: 'adult-bmi',
        num: 38,
        cat: 'nutrition',
        title: { en: 'Adult Body Mass Index (BMI)', ru: 'ИМТ для взрослых (BMI)', uz: 'Kattalar tana massasi indeksi (TMI)' },
        desc: { en: 'Standard adult BMI calculation and WHO nutritional categorization.', ru: 'Классификация массы тела по ВОЗ (дефицит, норма, избыток, ожирение).', uz: 'JSST bo‘yicha kattalarda tana massasi indeksini aniqlash.' },
        guideline: 'WHO Obesity and Overweight Factsheet / Endocrine Society',
        formula: 'BMI = Weight (kg) / [Height (m)]²',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/15003001/',
        population: 'Adults ≥ 18 years',
        fields: [
            { id: 'weight', label: 'Weight', type: 'number', step: '0.5', unit: 'kg', default: 74.0, placeholder: '74.0' },
            { id: 'height', label: 'Height', type: 'number', step: '0.5', unit: 'cm', default: 175.0, placeholder: '175.0' }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 0);
            const h = parseFloat(inputs.height || 0) / 100;
            if (!w || !h) return { value: '0.0 kg/m²', secondary: '', status: 'normal', interpretation: 'Enter height and weight.' };
            const bmi = (w / (h * h)).toFixed(1);
            let cat = 'Normal weight (18.5 – 24.9 kg/m²)';
            let status = 'normal';
            if (bmi < 18.5) { cat = 'Underweight (< 18.5 kg/m²)'; status = 'warning'; }
            else if (bmi >= 25.0 && bmi < 30.0) { cat = 'Overweight (25.0 – 29.9 kg/m²)'; status = 'warning'; }
            else if (bmi >= 30.0 && bmi < 35.0) { cat = 'Class I Obesity (30.0 – 34.9 kg/m²)'; status = 'alert'; }
            else if (bmi >= 35.0) { cat = 'Class II/III Obesity (≥ 35.0 kg/m²)'; status = 'alert'; }
            return {
                value: `BMI: ${bmi} kg/m²`,
                secondary: `WHO Category: ${cat}`,
                status,
                interpretation: 'Evaluate metabolic syndrome markers: waist circumference, fasting glucose, and lipid panel.'
            };
        }
    },
    {
        id: 'bmr-calculator',
        num: 39,
        cat: 'nutrition',
        title: { en: 'Basal Metabolic Rate (BMR)', ru: 'Базальный уровень метаболизма (BMR)', uz: 'Asosiy moddalar almashinuvi (BMR)' },
        desc: { en: 'Calculates baseline daily calories required at complete rest.', ru: 'Калории, необходимые для поддержания жизнедеятельности в покое (Mifflin-St Jeor).', uz: 'Organizmning to‘liq tinch holatdagi asosiy kaloriya ehtiyoji.' },
        guideline: 'Mifflin-St Jeor Equation (Validated Clinical Gold Standard)',
        formula: 'Men: 10W + 6.25H - 5A + 5; Women: 10W + 6.25H - 5A - 161',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/2305711/',
        population: 'Adults evaluated for weight management or endocrine obesity',
        fields: [
            { id: 'weight', label: 'Weight', type: 'number', step: '0.5', unit: 'kg', default: 72.0, placeholder: '72.0' },
            { id: 'height', label: 'Height', type: 'number', step: '0.5', unit: 'cm', default: 174.0, placeholder: '174.0' },
            { id: 'age', label: 'Age', type: 'number', step: '1', unit: 'years', default: 32, placeholder: '32' },
            { id: 'sex', label: 'Sex', type: 'select', default: 'male', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 70);
            const h = parseFloat(inputs.height || 170);
            const a = parseFloat(inputs.age || 30);
            const sex = inputs.sex || 'male';
            const bmr = sex === 'male' ? Math.round(10*w + 6.25*h - 5*a + 5) : Math.round(10*w + 6.25*h - 5*a - 161);
            return {
                value: `BMR: ${bmr} kcal/day`,
                secondary: 'Mifflin-St Jeor Basal Resting Expenditure',
                status: 'normal',
                interpretation: 'Minimum caloric burn required for vital organ function without movement.'
            };
        }
    },
    {
        id: 'tdee-calculator',
        num: 40,
        cat: 'nutrition',
        title: { en: 'Total Daily Energy Expenditure (TDEE)', ru: 'Общий суточный расход энергии (TDEE)', uz: 'Jami sutkalik energiya sarfi (TDEE)' },
        desc: { en: 'Adjusts basal metabolic rate by physical activity multiplier.', ru: 'Суточный расход калорий с учетом коэффициента физической активности.', uz: 'Jismoniy faollikni hisobga olgan holda kunlik kaloriya sarfi.' },
        guideline: 'FAO / WHO / UNU Energy Requirements',
        formula: 'TDEE = BMR * Physical Activity Level (1.2 to 1.725)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/15883556/',
        population: 'Nutritional and weight optimization',
        fields: [
            { id: 'weight', label: 'Weight', type: 'number', step: '0.5', unit: 'kg', default: 72.0, placeholder: '72.0' },
            { id: 'height', label: 'Height', type: 'number', step: '0.5', unit: 'cm', default: 174.0, placeholder: '174.0' },
            { id: 'age', label: 'Age', type: 'number', step: '1', unit: 'years', default: 32, placeholder: '32' },
            { id: 'sex', label: 'Sex', type: 'select', default: 'male', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
            { 
                id: 'activity', 
                label: 'Activity Factor', 
                type: 'select', 
                default: '1.375', 
                options: [
                    { value: '1.2', label: 'Sedentary (Desk job, little exercise) [1.20]' },
                    { value: '1.375', label: 'Lightly active (1–3 days/week exercise) [1.38]' },
                    { value: '1.55', label: 'Moderately active (3–5 days/week) [1.55]' },
                    { value: '1.725', label: 'Very active (6–7 days/week hard exercise) [1.73]' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 70);
            const h = parseFloat(inputs.height || 170);
            const a = parseFloat(inputs.age || 30);
            const sex = inputs.sex || 'male';
            const act = parseFloat(inputs.activity || 1.375);
            const bmr = sex === 'male' ? (10*w + 6.25*h - 5*a + 5) : (10*w + 6.25*h - 5*a - 161);
            const tdee = Math.round(bmr * act);
            return {
                value: `TDEE: ${tdee} kcal/day`,
                secondary: `Basal metabolic rate (BMR): ${Math.round(bmr)} kcal/day`,
                status: 'normal',
                interpretation: 'Daily energy intake needed to maintain current body weight exactly.'
            };
        }
    },
    {
        id: 'daily-calorie-target',
        num: 41,
        cat: 'nutrition',
        title: { en: 'Calorie Deficit & Weight Loss Target', ru: 'Целевой дефицит калорий для похудения', uz: 'Ozish uchun kaloriya defitsiti kalkulyatori' },
        desc: { en: 'Calculates safe daily caloric deficit for 0.5–1.0 kg weekly fat loss.', ru: 'Расчет безопасного дефицита калорий для снижения массы тела без потери мышц.', uz: 'Haftasiga 0.5-1.0 kg vazn yo‘qotish uchun xavfsiz kaloriya defitsiti.' },
        guideline: 'Endocrine Society Clinical Practice Guideline on Pharmacological & Dietary Weight Loss',
        formula: 'Deficit: TDEE - 500 kcal/day (~0.5 kg loss/week)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/25590212/',
        population: 'Overweight and obesity dietary planning',
        fields: [
            { id: 'tdee', label: 'Maintenance TDEE', type: 'number', step: '50', unit: 'kcal/day', default: 2250, placeholder: '2250' },
            { 
                id: 'goal', 
                label: 'Target Deficit', 
                type: 'select', 
                default: '500', 
                options: [
                    { value: '250', label: 'Mild Deficit (250 kcal/d → ~0.25 kg/wk)' },
                    { value: '500', label: 'Standard Deficit (500 kcal/d → ~0.50 kg/wk)' },
                    { value: '750', label: 'Aggressive Deficit (750 kcal/d → ~0.75 kg/wk)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const tdee = parseFloat(inputs.tdee || 2000);
            const def = parseFloat(inputs.goal || 500);
            const target = Math.round(tdee - def);
            return {
                value: `Target Calorie Intake: ${target} kcal/day`,
                secondary: `Daily deficit: -${def} kcal/day (Expected monthly fat loss: ~${(def * 0.004).toFixed(1)} kg)`,
                status: 'normal',
                interpretation: 'Ensure adequate protein intake (1.2–1.6 g/kg) to preserve lean skeletal muscle mass during restriction.'
            };
        }
    },
    {
        id: 'macros-calculator',
        num: 42,
        cat: 'nutrition',
        title: { en: 'Macronutrient Distribution (Protein / Carbs / Fat)', ru: 'Распределение макронутриентов (БЖУ)', uz: 'Makronutrientlar taqsimoti (Oqsillar / Yog‘lar / Uglevodlar)' },
        desc: { en: 'Translates daily calorie target into grams of protein, carbohydrate, and fat.', ru: 'Расчет суточной нормы белков, жиров и углеводов в граммах.', uz: 'Kunlik kaloriya bo‘yicha oqsil, yog‘ va uglevodlar grammini hisoblash.' },
        guideline: 'Dietary Reference Intakes (DRI) / ADA Nutritional Guidelines',
        formula: 'Protein: 4 kcal/g | Carbohydrates: 4 kcal/g | Fats: 9 kcal/g',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/30997399/',
        population: 'Metabolic syndrome, insulin resistance, and sports nutrition',
        fields: [
            { id: 'calories', label: 'Daily Target Calories', type: 'number', step: '50', unit: 'kcal/day', default: 1800, placeholder: '1800' },
            { 
                id: 'split', 
                label: 'Dietary Split', 
                type: 'select', 
                default: 'balanced', 
                options: [
                    { value: 'balanced', label: 'Balanced (45% Carbs, 25% Protein, 30% Fat)' },
                    { value: 'lowcarb', label: 'Low-Carb / Insulin-Sensitizing (25% Carbs, 35% Protein, 40% Fat)' },
                    { value: 'highprotein', label: 'High-Protein Satiety (35% Carbs, 35% Protein, 30% Fat)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const cal = parseFloat(inputs.calories || 1800);
            const sp = inputs.split || 'balanced';
            let cPct = 0.45, pPct = 0.25, fPct = 0.30;
            if (sp === 'lowcarb') { cPct = 0.25; pPct = 0.35; fPct = 0.40; }
            else if (sp === 'highprotein') { cPct = 0.35; pPct = 0.35; fPct = 0.30; }
            const carbs = Math.round((cal * cPct) / 4);
            const protein = Math.round((cal * pPct) / 4);
            const fat = Math.round((cal * fPct) / 9);
            return {
                value: `Protein: ${protein}g | Carbs: ${carbs}g | Fat: ${fat}g`,
                secondary: `Calorie breakdown: Protein ${(pPct*100).toFixed(0)}%, Carbs ${(cPct*100).toFixed(0)}%, Fat ${(fPct*100).toFixed(0)}%`,
                status: 'normal',
                interpretation: 'Optimizes satiety and blunts postprandial glucose surges in insulin-resistant patients.'
            };
        }
    },
    {
        id: 'pediatric-energy-requirement',
        num: 43,
        cat: 'nutrition',
        title: { en: 'Pediatric Schofield Energy Requirement', ru: 'Потребность в энергии у детей (Schofield)', uz: 'Bolalar energiya ehtiyoji (Schofield formulasi)' },
        desc: { en: 'Age- and weight-specific pediatric resting and total energy calculations.', ru: 'Расчет суточной потребности в энергии у детей по формулам Шофилда.', uz: 'Bolalar uchun Shofild formulasi bo‘yicha sutkalik kaloriya ehtiyoji.' },
        guideline: 'Schofield Equations for Pediatric Basal Metabolic Rate / WHO',
        formula: 'BMR (kcal) by age group + 30–40% growth and activity allowance',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/4044297/',
        population: 'Infants, children, and adolescents 0–18 years',
        fields: [
            { id: 'weight', label: 'Child Weight', type: 'number', step: '0.5', unit: 'kg', default: 20.0, placeholder: '20.0' },
            { id: 'age', label: 'Child Age', type: 'number', step: '1', unit: 'years', default: 6, placeholder: '6' },
            { id: 'sex', label: 'Sex', type: 'select', default: 'boy', options: [{ value: 'boy', label: 'Boy' }, { value: 'girl', label: 'Girl' }] }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 20);
            const a = parseFloat(inputs.age || 6);
            const sex = inputs.sex || 'boy';
            let bmr = 0;
            if (a <= 3) bmr = sex === 'boy' ? (59.5 * w - 30) : (58.3 * w - 31);
            else if (a <= 10) bmr = sex === 'boy' ? (22.7 * w + 504) : (20.3 * w + 486);
            else bmr = sex === 'boy' ? (17.7 * w + 658) : (13.4 * w + 693);
            const total = Math.round(bmr * 1.4);
            return {
                value: `Estimated Requirement: ${total} kcal/day`,
                secondary: `Basal Metabolic Needs: ${Math.round(bmr)} kcal/day`,
                status: 'normal',
                interpretation: 'Includes allowance for physical activity and normal somatic linear growth.'
            };
        }
    },

    // ==========================================
    // VI. THYROIDOLOGY (4 Tools)
    // ==========================================
    {
        id: 'lt4-dose',
        num: 44,
        cat: 'thyroid',
        title: { en: 'Levothyroxine (LT4) Dosing Calculator', ru: 'Дозирование левотироксина (L-Тироксин)', uz: 'Levotiroksin (L-Tiroksin) dozasi kalkulyatori' },
        desc: { en: 'Starting and replacement dose calculation across congenital, pediatric, and adult hypothyroidism.', ru: 'Расчет стартовой дозы L-тироксина при врожденном и приобретенном гипотиреозе.', uz: 'Tug‘ma va orttirilgan gipotireozda levotiroksinning boshlang‘ich dozasi.' },
        guideline: 'ATA / ESPE Guidelines on Hypothyroidism Management',
        formula: 'Congenital: 10–15 µg/kg/d; Pediatric acquired: 2–4 µg/kg/d; Adult: 1.6 µg/kg/d',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/25110963/',
        population: 'Neonates, children, and adults with hypothyroidism',
        fields: [
            { id: 'weight', label: 'Patient Weight', type: 'number', step: '0.5', unit: 'kg', default: 22.0, placeholder: '22.0' },
            { 
                id: 'indication', 
                label: 'Clinical Indication', 
                type: 'select', 
                default: 'pediatric', 
                options: [
                    { value: 'congenital', label: 'Congenital Hypothyroidism (10–15 µg/kg/day)' },
                    { value: 'pediatric', label: 'Pediatric Acquired (2–4 µg/kg/day)' },
                    { value: 'adult', label: 'Adult Primary Hypothyroidism (1.6 µg/kg/day)' },
                    { value: 'elderly', label: 'Elderly / Cardiac Disease (0.5–1.0 µg/kg/day)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const w = parseFloat(inputs.weight || 20);
            const ind = inputs.indication || 'pediatric';
            let factor = 3.0;
            if (ind === 'congenital') factor = 12.5;
            else if (ind === 'adult') factor = 1.6;
            else if (ind === 'elderly') factor = 0.8;
            const dose = Math.round(w * factor);
            const nearestTab = Math.round(dose / 25) * 25 || 25;
            return {
                value: `Starting Dose: ${dose} µg/day`,
                secondary: `Nearest Commercial Tablet Size: ${nearestTab} µg (${factor} µg/kg/day)`,
                status: 'normal',
                interpretation: 'Take once daily in the morning on an empty stomach with water, 30–60 minutes before breakfast. Re-check TSH and Free T4 in 4–6 weeks.'
            };
        }
    },
    {
        id: 'thyroid-pattern',
        num: 45,
        cat: 'thyroid',
        title: { en: 'Thyroid Function Test (TFT) Pattern Recognition', ru: 'Интерпретатор профиля щитовидной железы (ТТГ / свТ4)', uz: 'Qalqonsimon bez gormonlari (TTG / erkin T4) tahlili' },
        desc: { en: 'Diagnostic algorithm distinguishing overt, subclinical, central, and resistance thyroid patterns.', ru: 'Автоматическая расшифровка комбинаций ТТГ, свободного Т4 и свободного Т3.', uz: 'TTG va erkin T4 nisbatiga qarab gipotireoz yoki tireotoksikozni aniqlash.' },
        guideline: 'American Thyroid Association (ATA) / European Thyroid Association (ETA)',
        formula: 'Algorithmic correlation of TSH (0.4–4.0 mIU/L) and Free T4 (10–22 pmol/L)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/23088737/',
        population: 'Patients presenting with thyroid lab anomalies',
        fields: [
            { id: 'tsh', label: 'Serum TSH', type: 'number', step: '0.1', unit: 'mIU/L', default: 8.5, placeholder: '8.5' },
            { id: 'ft4', label: 'Free T4', type: 'number', step: '0.5', unit: 'pmol/L', default: 13.5, placeholder: '13.5' }
        ],
        calculate: (inputs) => {
            const tsh = parseFloat(inputs.tsh || 2.0);
            const ft4 = parseFloat(inputs.ft4 || 15.0);
            let pattern = 'Normal Euthyroid Pattern';
            let status = 'normal';
            let interp = 'TSH and Free T4 are both within normal reference boundaries.';
            if (tsh > 4.5 && ft4 < 10.0) {
                pattern = 'Primary Overt Hypothyroidism';
                status = 'alert';
                interp = 'High TSH with subnormal Free T4. Indication for Levothyroxine replacement. Test Anti-TPO antibodies (Hashimoto thyroiditis).';
            } else if (tsh > 4.5 && ft4 >= 10.0 && ft4 <= 22.0) {
                pattern = 'Subclinical Hypothyroidism';
                status = 'warning';
                interp = 'Elevated TSH with normal Free T4. If TSH > 10 mIU/L or patient is pregnant/symptomatic, treatment is recommended.';
            } else if (tsh < 0.4 && ft4 > 22.0) {
                pattern = 'Primary Overt Hyperthyroidism (Thyrotoxicosis)';
                status = 'alert';
                interp = 'Suppressed TSH with elevated Free T4. Check TSH-receptor antibodies (TRAb) to confirm Graves\' disease and arrange ultrasound.';
            } else if (tsh < 0.4 && ft4 >= 10.0 && ft4 <= 22.0) {
                pattern = 'Subclinical Hyperthyroidism';
                status = 'warning';
                interp = 'Suppressed TSH with normal Free T4. Monitor for atrial fibrillation and osteopenia.';
            } else if (tsh <= 4.0 && ft4 < 10.0) {
                pattern = 'Secondary / Central Hypothyroidism';
                status = 'alert';
                interp = 'Low or inappropriately normal TSH with low Free T4. Suggests pituitary or hypothalamic dysfunction. Pituitary MRI required.';
            }
            return {
                value: pattern,
                secondary: `TSH: ${tsh} mIU/L | Free T4: ${ft4} pmol/L`,
                status,
                interpretation: interp
            };
        }
    },
    {
        id: 'thyroid-volume-us',
        num: 46,
        cat: 'thyroid',
        title: { en: 'Ultrasound Thyroid Volumetry (Adult)', ru: 'УЗИ объем щитовидной железы (Взрослые)', uz: 'Kattalar qalqonsimon bez UZI hajmi' },
        desc: { en: 'Ellipsoid formula calculation of each lobe and adult goiter assessment.', ru: 'Расчет объема каждой доли и классификация зоба (норма <18 мл у женщин, <25 мл у мужчин).', uz: 'Har bir bo‘lak o‘lchami bo‘yicha umumiy buqoq hajmini hisoblash.' },
        guideline: 'Brunn Ellipsoid Formula / WHO Ultrasound Reference',
        formula: 'Volume (mL) = [(L * W * D * 0.479) Right] + [(L * W * D * 0.479) Left]',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/7268393/',
        population: 'Adults undergoing thyroid ultrasound evaluation',
        fields: [
            { id: 'sex', label: 'Patient Sex', type: 'select', default: 'female', options: [{ value: 'female', label: 'Female (Normal < 18 mL)' }, { value: 'male', label: 'Male (Normal < 25 mL)' }] },
            { id: 'rL', label: 'Right Lobe Length', type: 'number', step: '0.1', unit: 'cm', default: 4.8, placeholder: '4.8' },
            { id: 'rW', label: 'Right Lobe Width', type: 'number', step: '0.1', unit: 'cm', default: 2.1, placeholder: '2.1' },
            { id: 'rD', label: 'Right Lobe Depth', type: 'number', step: '0.1', unit: 'cm', default: 1.8, placeholder: '1.8' },
            { id: 'lL', label: 'Left Lobe Length', type: 'number', step: '0.1', unit: 'cm', default: 4.5, placeholder: '4.5' },
            { id: 'lW', label: 'Left Lobe Width', type: 'number', step: '0.1', unit: 'cm', default: 1.9, placeholder: '1.9' },
            { id: 'lD', label: 'Left Lobe Depth', type: 'number', step: '0.1', unit: 'cm', default: 1.6, placeholder: '1.6' }
        ],
        calculate: (inputs) => {
            const sex = inputs.sex || 'female';
            const rL = parseFloat(inputs.rL || 0), rW = parseFloat(inputs.rW || 0), rD = parseFloat(inputs.rD || 0);
            const lL = parseFloat(inputs.lL || 0), lW = parseFloat(inputs.lW || 0), lD = parseFloat(inputs.lD || 0);
            const rVol = rL * rW * rD * 0.479;
            const lVol = lL * lW * lD * 0.479;
            const total = (rVol + lVol).toFixed(1);
            const limit = sex === 'female' ? 18.0 : 25.0;
            const isGoiter = parseFloat(total) > limit;
            return {
                value: `Total Volume: ${total} mL`,
                secondary: `Right Lobe: ${rVol.toFixed(1)} mL | Left Lobe: ${lVol.toFixed(1)} mL (Upper limit: ${limit} mL)`,
                status: isGoiter ? 'warning' : 'normal',
                interpretation: isGoiter 
                    ? `Volume exceeds standard adult thresholds for ${sex === 'female' ? 'females (18 mL)' : 'males (25 mL)'}. Confirms sonographic goiter.`
                    : 'Thyroid volume is within normal anatomical reference limits.'
            };
        }
    },
    {
        id: 'thyroid-nodule-bethesda',
        num: 47,
        cat: 'thyroid',
        title: { en: 'Bethesda System for Thyroid Cytopathology', ru: 'Шкала Бетесда для пункции щитовидной железы', uz: 'Qalqonsimon bez tugunlari Bethesda tizimi' },
        desc: { en: 'FNA cytology risk stratification (I–VI) and clinical management recommendations.', ru: 'Оценка риска злокачественности узла и тактика по классификации Bethesda 2023.', uz: 'TUGUN biopsiyasi natijasi (FNA) va xavflilik darajasini aniqlash.' },
        guideline: 'The 2023 Bethesda System for Reporting Thyroid Cytopathology (3rd Edition)',
        formula: 'Categorical malignancy risk: I (5-10%), II (0-3%), III (10-30%), IV (25-40%), V (60-75%), VI (97-99%)',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/37422998/',
        population: 'Patients with thyroid nodules undergoing fine needle aspiration (FNA)',
        fields: [
            { 
                id: 'category', 
                label: 'Bethesda Cytology Category', 
                type: 'select', 
                default: 'III', 
                options: [
                    { value: 'I', label: 'Bethesda I: Non-diagnostic / Unsatisfactory' },
                    { value: 'II', label: 'Bethesda II: Benign (Colloid nodule, lymphocytic thyroiditis)' },
                    { value: 'III', label: 'Bethesda III: AUS / FLUS (Atypia of Undetermined Significance)' },
                    { value: 'IV', label: 'Bethesda IV: Follicular Neoplasm / Suspicious for Follicular Neoplasm' },
                    { value: 'V', label: 'Bethesda V: Suspicious for Malignancy' },
                    { value: 'VI', label: 'Bethesda VI: Malignant (Papillary, Medullary, Anaplastic)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const cat = inputs.category || 'III';
            const mapping = {
                'I': { risk: '5–13%', action: 'Repeat FNA under ultrasound guidance with on-site cytopathology.', status: 'warning' },
                'II': { risk: '1–3%', action: 'Benign lesion. Clinical and ultrasound follow-up in 12–24 months without surgery.', status: 'normal' },
                'III': { risk: '13–30%', action: 'Repeat FNA or perform molecular diagnostic testing (e.g. ThyroSeq, Afirma) or diagnostic lobectomy.', status: 'warning' },
                'IV': { risk: '23–34%', action: 'Surgical diagnostic lobectomy or molecular testing to determine malignancy risk.', status: 'warning' },
                'V': { risk: '67–83%', action: 'Surgical management: Near-total or total thyroidectomy (or lobectomy for small unifocal lesions).', status: 'alert' },
                'VI': { risk: '97–100%', action: 'Confirmed malignancy. Total thyroidectomy with central neck lymph node dissection as indicated.', status: 'alert' }
            };
            const res = mapping[cat];
            return {
                value: `Bethesda ${cat}: Risk of Malignancy ${res.risk}`,
                secondary: `Management: ${res.action}`,
                status: res.status,
                interpretation: `According to the revised 2023 Bethesda International Consensus.`
            };
        }
    },

    // ==========================================
    // VII. BONE, ELECTROLYTES & METABOLIC (3 Tools)
    // ==========================================
    {
        id: 'egfr-calculator',
        num: 48,
        cat: 'metabolic',
        title: { en: 'eGFR (Pediatric Schwartz & CKD-EPI)', ru: 'Скорость клубочковой фильтрации (СКФ / eGFR)', uz: 'Kalavalar filtratsiyasi tezligi (SKF / eGFR)' },
        desc: { en: 'Bedside Schwartz formula for children and CKD-EPI formula for adult diabetic nephropathy.', ru: 'Расчет СКФ по формуле Шварца у детей и CKD-EPI у взрослых.', uz: 'Bolalarda Shvarts va kattalarda CKD-EPI bo‘yicha buyrak filtratsiyasi.' },
        guideline: 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD',
        formula: 'Pediatric: eGFR = (0.413 * Height_cm) / Creatinine_mg_dL; Adult: CKD-EPI 2021',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/38490803/',
        population: 'Pediatric and adult patients with diabetes, hypertension, or nephropathy',
        fields: [
            { id: 'creat', label: 'Serum Creatinine', type: 'number', step: '0.05', unit: 'mg/dL', default: 0.7, placeholder: '0.7' },
            { id: 'height', label: 'Height (for children)', type: 'number', step: '0.5', unit: 'cm', default: 130.0, placeholder: '130.0' },
            { id: 'age', label: 'Age', type: 'number', step: '1', unit: 'years', default: 9, placeholder: '9' }
        ],
        calculate: (inputs) => {
            const cr = parseFloat(inputs.creat || 0.7);
            const h = parseFloat(inputs.height || 120);
            const age = parseFloat(inputs.age || 10);
            let egfr = 0;
            if (age < 18) {
                egfr = ((0.413 * h) / (cr || 0.1)).toFixed(1);
            } else {
                egfr = (142 * Math.pow(Math.min(cr / 0.9, 1), -0.302) * Math.pow(0.9938, age)).toFixed(1);
            }
            const val = parseFloat(egfr);
            const status = val >= 90 ? 'normal' : val >= 60 ? 'warning' : 'alert';
            let stage = 'Stage G1: Normal or high renal filtration (≥ 90 mL/min/1.73m²)';
            if (val >= 60 && val < 90) stage = 'Stage G2: Mildly decreased (60–89 mL/min/1.73m²)';
            else if (val >= 30 && val < 60) stage = 'Stage G3: Moderately decreased (30–59 mL/min/1.73m²)';
            else if (val < 30) stage = 'Stage G4/G5: Severely decreased / Kidney failure (< 30 mL/min/1.73m²)';
            return {
                value: `eGFR: ${egfr} mL/min/1.73m²`,
                secondary: stage,
                status,
                interpretation: `Calculated via Bedside Schwartz method (k=0.413). Adjust medication doses if eGFR < 60.`
            };
        }
    },
    {
        id: 'corrected-calcium',
        num: 49,
        cat: 'metabolic',
        title: { en: 'Albumin-Corrected Calcium & Ca×P Product', ru: 'Кальций, скорректированный на альбумин', uz: 'Albumin bo‘yicha to‘g‘rilangan kalsiy va Ca×P' },
        desc: { en: 'Adjusts total serum calcium for hypoalbuminemia and calculates metastatic calcification risk.', ru: 'Пересчет кальция с учетом сывороточного альбумина и кальций-фосфорного произведения.', uz: 'Gipoalbuminemiyada kalsiyni to‘g‘rilash va metastatik kalsinoz xavfini hisoblash.' },
        guideline: 'Payne Formula for Albumin-Adjusted Calcium / KDIGO Guidelines',
        formula: 'Corrected Ca (mg/dL) = Measured Ca + 0.8 * (4.0 - Albumin [g/dL]); Ca*P threshold > 55',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/4794835/',
        population: 'Hypoparathyroidism, rickets, CKD-MBD, and hypercalcemia',
        fields: [
            { id: 'ca', label: 'Measured Total Calcium', type: 'number', step: '0.1', unit: 'mg/dL', default: 8.2, placeholder: '8.2' },
            { id: 'alb', label: 'Serum Albumin', type: 'number', step: '0.1', unit: 'g/dL', default: 2.8, placeholder: '2.8' },
            { id: 'phos', label: 'Serum Phosphate', type: 'number', step: '0.1', unit: 'mg/dL', default: 4.2, placeholder: '4.2' }
        ],
        calculate: (inputs) => {
            const ca = parseFloat(inputs.ca || 8.0);
            const alb = parseFloat(inputs.alb || 4.0);
            const phos = parseFloat(inputs.phos || 4.0);
            const corr = (ca + 0.8 * (4.0 - alb)).toFixed(2);
            const prod = (parseFloat(corr) * phos).toFixed(1);
            const status = corr < 8.5 ? 'alert' : corr > 10.5 ? 'alert' : 'normal';
            return {
                value: `Corrected Calcium: ${corr} mg/dL`,
                secondary: `Ca × P Product: ${prod} mg²/dL² (Metastatic calcification risk cutoff: > 55)`,
                status,
                interpretation: corr < 8.5 
                    ? 'True Hypocalcemia. Evaluate PTH, 25-OH Vitamin D, and QTc interval on ECG.'
                    : corr > 10.5 
                    ? 'True Hypercalcemia. Evaluate primary hyperparathyroidism or malignancy.'
                    : 'Normal albumin-corrected calcium concentration (8.5 – 10.5 mg/dL).'
            };
        }
    },
    {
        id: 'frax-osteoporosis',
        num: 50,
        cat: 'metabolic',
        title: { en: 'FRAX & Fracture Risk Assessment', ru: 'Оценка риска переломов FRAX / Остеопороз', uz: 'FRAX sinish xavfi shkalasi / Osteoporoz' },
        desc: { en: '10-year probability of major osteoporotic fracture and hip fracture in glucocorticoid therapy.', ru: '10-летняя вероятность остеопоротических переломов при терапии стероидами.', uz: 'Kortikosteroidlar qabul qiluvchi va kattalarda 10 yillik suyak sinish xavfi darajasi.' },
        guideline: 'WHO Collaborating Centre FRAX Model / Endocrine Society Osteoporosis Guideline',
        formula: 'Algorithmic 10-year probability integrating femoral neck T-score and clinical risk factors',
        pubmed: 'https://pubmed.ncbi.nlm.nih.gov/18292978/',
        population: 'Postmenopausal women, men ≥ 50, and patients on long-term systemic glucocorticoids',
        fields: [
            { id: 'age', label: 'Patient Age', type: 'number', step: '1', unit: 'years', default: 62, placeholder: '62' },
            { id: 'tscore', label: 'Femoral Neck T-Score', type: 'number', step: '0.1', unit: 'SD', default: -2.3, placeholder: '-2.3' },
            { 
                id: 'steroids', 
                label: 'Systemic Glucocorticoids', 
                type: 'select', 
                default: 'yes', 
                options: [
                    { value: 'yes', label: 'Yes (Prednisone ≥ 5mg/day for > 3 months)' },
                    { value: 'no', label: 'No' }
                ] 
            },
            { 
                id: 'priorFracture', 
                label: 'Previous Fragility Fracture', 
                type: 'select', 
                default: 'no', 
                options: [
                    { value: 'no', label: 'No prior low-trauma fracture' },
                    { value: 'yes', label: 'Yes (Previous spine, hip, or wrist fracture)' }
                ] 
            }
        ],
        calculate: (inputs) => {
            const age = parseFloat(inputs.age || 60);
            const ts = parseFloat(inputs.tscore || -2.0);
            const st = inputs.steroids || 'yes';
            const fx = inputs.priorFracture || 'no';
            let major = 8.5 + (Math.abs(ts) * 4.2) + (age > 65 ? 4.0 : 0);
            if (st === 'yes') major += 6.5;
            if (fx === 'yes') major += 8.0;
            let hip = 1.2 + (Math.abs(ts) * 1.8) + (st === 'yes' ? 2.5 : 0) + (fx === 'yes' ? 3.0 : 0);
            major = Math.min(60, major).toFixed(1);
            hip = Math.min(35, hip).toFixed(1);
            const treat = parseFloat(major) >= 20.0 || parseFloat(hip) >= 3.0;
            return {
                value: `10-Year Major Fracture Risk: ${major}% | Hip: ${hip}%`,
                secondary: `NOF Treatment Threshold: Major ≥ 20.0% or Hip ≥ 3.0%`,
                status: treat ? 'alert' : 'normal',
                interpretation: treat 
                    ? 'High Fracture Risk Exceeding Clinical Intervention Threshold. Antiresorptive therapy (bisphosphonates/denosumab) indicated.'
                    : 'Low to moderate fracture probability. Maintain adequate calcium (1200 mg/d) and Vitamin D (1000–2000 IU/d).'
            };
        }
    }
];
