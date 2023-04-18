module.exports = {
    parserPreset: 'conventional-changelog-conventionalcommits',
    rules: {
        'body-leading-blank': [1, 'always'],
        'body-max-line-length': [2, 'always', 100],
        'footer-leading-blank': [1, 'always'],
        'footer-max-line-length': [2, 'always', 100],
        'header-max-length': [2, 'always', 100],
        'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'refactor', 'revert', 'style', 'test']],
        'develop-rule': [2, 'always'],
    },
    plugins: [
        {
            rules: {
                'type-enum': ({ type }) => {
                    const commitFolders = ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'refactor', 'revert', 'style', 'test'];
                    return [
                        commitFolders.some((folder) => type === folder),
                        `
feat: 새로운 기능 추가에 대한 커밋
build: 빌드 관련 파일 수정에 대한 커밋 
chore: 그 외 자잘한 수정에 대한 커밋(기타 변경) 
ci: CI 관련 설정 수정에 대한 커밋
docs: 문서 수정에 대한 커밋
fix: 버그 수정에 대한 커밋
refactor: 코드 리팩토링에 대한 커밋
revert: 돌아가는 것
style: ui 스타일에 관한 커밋
test: 테스트 코드 리팩토링 테스트 코드 수정에 대한 커밋
위 타입만 올 수 있습니다.`,
                    ];
                },
                'develop-rule': ({ subject }) => {
                    const commitFolders = ['[frontend]', '[backend]', '[DH]'];
                    return [
                        commitFolders.some((folder) => subject?.startsWith(folder) !== subject?.endsWith(folder)),
                        `\n${commitFolders
                            .map((folder) => `${folder}\n`)
                            .join('')}위 네 가지 중 한 가지는 반드시 콜론(:) 뒤에 포함되어야 합니다.
[name] 뒤에 메시지 입력은 필수입니다.
ex) feat: [backend] return 타입 수정
                          `,
                    ];
                },
            },
        },
    ],
};
