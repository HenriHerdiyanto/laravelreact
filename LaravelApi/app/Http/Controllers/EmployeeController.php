<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return response()->json($employees, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'identity_number' => 'required|string|unique:employees',
            'email' => 'required|string|email|unique:employees',
            'birth_day' => 'required|date',
        ]);

        $employee = Employee::create($request->all());

        return response()->json($employee, 201);
    }

    public function show(Employee $employee)
    {
        return response()->json($employee, 200);
    }

    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name' => 'sometimes|required|string',
            'identity_number' => 'sometimes|required|string|unique:employees,identity_number,' . $employee->id,
            'email' => 'sometimes|required|string|email|unique:employees,email,' . $employee->id,
            'birth_day' => 'sometimes|required|date',
        ]);

        $employee->update($request->all());

        return response()->json($employee, 200);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return response()->json(null, 204);
    }
}
