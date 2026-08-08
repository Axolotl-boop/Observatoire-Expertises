# Synthèse de la demande réelle — 07/2026

> Source : delta du pipe Boond, opportunités détectées entre le 02/07/2026 et le 31/07/2026.
> **Fichier produit hors pipeline** (rattrapage manuel du run raté du 1er août) — agrégats recalculés sur le même moteur, rédaction non issue de l'agent `cr1c3_SynthsedemandeBoond`. La forme peut différer des synthèses des autres mois.
> Périmètre : agrégats uniquement. Aucune opportunité nominative.

## Volume et nature

**28 opportunités détectées**, réparties sur **18 clients distincts** — dont 7 clients porteurs de plusieurs opportunités sur le mois (jusqu'à 3).

| Nature | Volume |
|---|---|
| Immersion (régie / AT) | 25 |
| Conseil (fullstack, coaching & formation, forfait) | 3 |
| Autre | 0 |

Le déséquilibre est massif : **89 % de la demande détectée en juillet est de la régie**. C'est le signal le plus net du mois, et le plus inconfortable — il faut le lire avec la conversion.

## Conversion

| | Gagné | Perdu / abandonné | Encore actif | Taux de transfo |
|---|---|---|---|---|
| Régie | 2 | 3 | 20 | 40 % |
| Conseil | 1 | 1 | 1 | 50 % |

**Ces taux ne sont pas exploitables tels quels.** Trois décisions en régie, deux en conseil : sur un mois isolé, l'intervalle de confiance couvre à peu près tout. Vingt opportunités sur vingt-cinq sont encore ouvertes, donc le vrai taux de juillet ne sera connu qu'en septembre ou octobre. À traiter comme un compteur d'avancement, pas comme un indicateur de performance.

État du pipe à date : 7 en P1 (bouillant), 12 en P2 (chaud), 2 détectées, 3 gagnées, 4 perdues.

## Mentions par expertise

Heuristique regex multi-label sur titre + description — **une opportunité compte pour plusieurs expertises**, et une mention n'est pas un classement validé.

| Expertise | Mentions |
|---|---|
| Product Management | 21 |
| QA | 12 |
| Product AI | 11 |
| Product Ops | 5 |
| PMM | 2 |
| Data PM | 1 |

Deux choses à retenir. **QA arrive deuxième**, devant Product AI — porté par des demandes explicitement outillées (automatisation, frameworks de test, UAT). Et **Product AI est presque toujours co-mentionné avec Product Management** plutôt que seul : l'IA arrive comme qualificatif d'un poste produit, pas comme un besoin autonome. C'est la lecture qui compte pour l'offre.

Data PM et PMM sont sous le seuil d'interprétation. Une mention ne dit rien.

## Séniorité demandée

| Niveau | Mentions |
|---|---|
| head / dir | 7 |
| senior | 6 |
| lead | 5 |
| confirmé | 4 |
| coach | 2 |
| junior | 1 |
| principal | 1 |

Le tropisme haut de gamme se confirme : **13 mentions lead ou au-dessus contre 1 junior**. Cohérent avec le signal de fond déjà tracé au SPECS (la valeur se déplace vers le jugement), mais attention — c'est un mois, et les libellés d'opportunité sont rédigés par les PAD, qui ont un intérêt à qualifier haut.

## Vocabulaire dominant

delivery (9) · analytics/KPI (9) · roadmap (8) · discovery (6) · UX/design (6) · plateforme (6) · agile/scrum (5) · Jira/Confluence (5) · OKR (5)

**Delivery devance discovery de 50 %.** Sur un pipe majoritairement régie, ce n'est pas surprenant, mais ça mérite d'être mis en regard du discours du marché, qui reste très orienté discovery. L'écart entre ce qu'on vend et ce dont on parle est un croisement à instruire au Format B, pas une conclusion.

## Concurrents cités

Octo (5) · Thiga (1) · Capgemini (1)

**Octo se détache nettement** — cinq mentions sur 28 opportunités, seul cabinet à apparaître de façon répétée. À noter : Octo ne figure pas dans la watch-list concurrentielle des 12. Signal faible, un seul mois, mais qui mérite d'être confronté au snapshot concurrentiel T3.

## Demande conseil — les trois du mois

Trop peu pour un pattern, assez pour trois observations :

- Un **audit outils & process qualité** en environnement SAP international, avec un dispositif UAT porté par des Business Process Owners métier. P1, en cours. C'est du conseil QA structurant, pas du renfort — le type de demande où notre positionnement se joue.
- Un **coaching PM sur la discovery** en e-commerce post-migration, avec un besoin explicitement formulé comme « pas d'approche data à date ». Perdu. Format court demandé (une à deux sessions) : le décalage entre le format attendu et notre offre mérite d'être regardé.
- Un **forfait de refonte** avec du PO embarqué. Gagné.

Un audit perdu et un coaching perdu sur trois, avec un forfait gagné : rien de généralisable, mais la demande conseil qui arrive est plutôt de l'audit et du cadrage que de l'exécution.

## Limites de cette synthèse

- Un mois isolé. Aucun de ces chiffres ne soutient un `[structurel]` seul.
- Les taux de conversion portent sur 3 et 2 décisions respectivement — non significatifs.
- Les mentions d'expertise sont une heuristique par expressions régulières : multi-label, sensible au vocabulaire des PAD, et indicative seulement.
- Le pipe reflète ce que les PAD saisissent, pas la demande du marché. Un biais de saisie se lit ici comme un signal.
