import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

app = FastAPI(title="CodeTalkers API", version="1.0.0")

# Enable CORS for local cross-origin development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeSnippetRequest(BaseModel):
    code: str
    language: str

class AnnotationStep(BaseModel):
    line_number: int
    title: str
    explanation: str
    severity: str  # 'info', 'warning', 'success', 'tip'
    highlight_range: Optional[List[int]] = None

class CodeAnalysisResponse(BaseModel):
    language: str
    complexity: str
    summary: str
    steps: List[AnnotationStep]
    insights: Dict[str, Any]

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CodeTalkers API",
        "runtime": "Python serverless"
    }

def analyze_code_structure(code: str, language: str) -> CodeAnalysisResponse:
    lines = code.split("\n")
    steps = []
    insights = {
        "has_loops": False,
        "has_db_calls": False,
        "has_auth": False,
        "functions_found": [],
        "imports_found": []
    }
    
    # Pre-parse lines to collect imports and function definitions
    for idx, line in enumerate(lines):
        line_num = idx + 1
        stripped = line.strip()
        
        # Check for imports
        import_match = re.match(r'^(import|from|const .* = require|import .* from)\s+([\w\.\'\"\-]+)', stripped)
        if import_match:
            insights["imports_found"].append(import_match.group(2))
            steps.append(AnnotationStep(
                line_number=line_num,
                title="Dependency Loaded",
                explanation=f"Imports the external module **{import_match.group(2)}** to load required library features.",
                severity="info"
            ))
            
        # Check for function definitions
        func_match = re.match(r'^(def|function|async function|const .* =.*=>)\s+(\w+)', stripped)
        if func_match:
            func_name = func_match.group(2)
            insights["functions_found"].append(func_name)
            steps.append(AnnotationStep(
                line_number=line_num,
                title=f"Function Definition: {func_name}",
                explanation=f"Declares the function **{func_name}**, encapsulating a dedicated reusable block of application logic.",
                severity="success"
            ))
            
        # Check for loops
        if any(keyword in stripped for keyword in ["for ", "while ", ".map(", ".forEach("]):
            insights["has_loops"] = True
            steps.append(AnnotationStep(
                line_number=line_num,
                title="Iteration Loop",
                explanation="Executes a looping construct to cycle through elements or repeat logic until conditions are met.",
                severity="tip"
            ))
            
        # Check for database references or API calls
        if any(keyword in stripped.lower() for keyword in ["select ", "insert ", "update ", "delete ", "db.", "fetch(", "axios.", "query"]):
            insights["has_db_calls"] = True
            steps.append(AnnotationStep(
                line_number=line_num,
                title="Data Query / I/O Call",
                explanation="Initiates a query, API fetch, or database interaction to retrieve/modify persistent storage data.",
                severity="info"
            ))

        # Check for authentication or security references
        if any(keyword in stripped.lower() for keyword in ["token", "auth", "jwt", "password", "secret", "apikey"]):
            insights["has_auth"] = True
            steps.append(AnnotationStep(
                line_number=line_num,
                title="Security / Auth Hook",
                explanation="Handles token authorization, password evaluation, or credential checks to secure operations.",
                severity="warning"
            ))

    # Add a fallback final step if no steps detected
    if not steps:
        steps.append(AnnotationStep(
            line_number=1,
            title="Code Execution Start",
            explanation="Initial entry point of the provided script block. Evaluates top-level statements sequentially.",
            severity="info"
        ))

    # Determine general metrics
    complexity = "O(1) - Constant Time"
    if insights["has_loops"]:
        complexity = "O(N) - Linear Time (Loop detected)"
    
    summary = (
        f"A script containing {len(lines)} lines of **{language}** code. "
        f"It establishes {len(insights['functions_found'])} custom function(s) "
        f"and requests {len(insights['imports_found'])} external module(s)."
    )

    return CodeAnalysisResponse(
        language=language,
        complexity=complexity,
        summary=summary,
        steps=steps,
        insights=insights
    )

@app.post("/api/clarify", response_model=CodeAnalysisResponse)
def clarify_code(payload: CodeSnippetRequest):
    if not payload.code.strip():
        raise HTTPException(status_code=400, detail="Provided code block is empty")
    
    try:
        analysis = analyze_code_structure(payload.code, payload.language)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
