@extends('layouts.master')

@section('content')

    <h1>Certificate</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>Child Id</th><th>House Id</th><th>Allocation Id</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $certificate->id }}</td> <td> {{ $certificate->child_id }} </td><td> {{ $certificate->house_id }} </td><td> {{ $certificate->allocation_id }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection